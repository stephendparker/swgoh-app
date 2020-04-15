package com.strange.swgoh.swgohapp.calculator;

import com.strange.swgoh.swgohapp.data.SwgohConstants;
import com.strange.swgoh.swgohapp.data.swgoh.mods.Mod;
import com.strange.swgoh.swgohapp.data.swgoh.mods.Mods;
import com.strange.swgoh.swgohapp.data.swgoh.mods.SecondaryStat;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class ModsCalculator {

    public static final int MAX_UNITS = 25;


    public static ModCalculatorResultsDto calculateMods(List<Mods> modsList) {
        ModCalculatorResultsDto retVal = new ModCalculatorResultsDto();

        for (Mods mods : modsList) {
            List<ModCalculatorCharacterResultsDto> characterResults = new ArrayList<>();

            for (Mod mod : mods.getMods()) {
                // find character if it exists
                ModCalculatorCharacterResultsDto characterResult = null;
                for (ModCalculatorCharacterResultsDto searchResult : characterResults) {
                    if (StringUtils.equals(searchResult.name, mod.getCharacter())) {
                        characterResult = searchResult;
                    }
                }
                if (characterResult == null) {
                    characterResult = new ModCalculatorCharacterResultsDto();
                    characterResult.name = mod.getCharacter();
                    characterResult.count = 1;
                    characterResults.add(characterResult);
                }
                ModsCalculator.addMod(characterResult, mod);
            }
            ModsCalculator.addCharacterResults(retVal, characterResults);
        }
        ModsCalculator.calculateResults(retVal);
        return retVal;
    }

    private static void calculateResults(ModCalculatorResultsDto results) {

        for (ModCalculatorCharacterResultsDto result : results.characterResults) {
            // - calculate modifier for 4-2 set vs 2-2-2 set
            calculateSetCountMultipliers(result);

            // - calculate specific set multiplers: speed, offense, crit damage, etc
            calculateSetMultipliers(result);

            calculateCommons(result);

            // calculate multipliers for circle, cross, triangle, arrow, etc.
            calculatePrimaryMultipliers(result);

            calculateSecondaryMultipliers(result);
        }
    }

    private static void calculateCommons(ModCalculatorCharacterResultsDto result) {
        if (result.fourSetsMultiplier > result.twoSetsMultiplier) {
            Integer topFourSet = null;
            Integer topFourSetCount = null;
            Integer topTwoSet = null;
            Integer topTwoSetCount = null;

            for (Integer set : result.setCounts.keySet()) {
                if (SwgohConstants.MOD_FOUR_SETS.contains(set)) {
                    if (topFourSet == null || topFourSetCount.compareTo(result.setCounts.get(set)) < 0) {
                        topFourSet = set;
                        topFourSetCount = result.setCounts.get(set);
                    }
                } else {
                    if (topTwoSet == null || topTwoSetCount.compareTo(result.setCounts.get(set)) < 0) {
                        topTwoSet = set;
                        topTwoSetCount = result.setCounts.get(set);
                    }
                }
            }
            if (topFourSet != null) result.commonSet1Name = SwgohConstants.SET_NAME_MAP.get(topFourSet);
            if (topTwoSet != null) result.commonSet2Name = SwgohConstants.SET_NAME_MAP.get(topTwoSet);
        } else {
            if (result.twoSetOccurrenceCounts.size() > 0)
                result.commonSet1Name = SwgohConstants.SET_NAME_MAP.get(result.twoSetOccurrenceCounts.get(0).set);
            if (result.twoSetOccurrenceCounts.size() > 1)
                result.commonSet2Name = SwgohConstants.SET_NAME_MAP.get(result.twoSetOccurrenceCounts.get(1).set);
            if (result.twoSetOccurrenceCounts.size() > 2)
                result.commonSet3Name = SwgohConstants.SET_NAME_MAP.get(result.twoSetOccurrenceCounts.get(2).set);
        }
    }

    private static void calculateSetMultipliers(ModCalculatorCharacterResultsDto result) {
        float highestFourSetCount = 0;
        float highestTwoSetCount = 0;

        List<Float> twoSetCounts = new ArrayList<>();

        for (Integer set : result.setCounts.keySet()) {
            Integer count = result.setCounts.get(set);
            if (SwgohConstants.MOD_FOUR_SETS.contains(set)) {
                if (count > highestFourSetCount) {
                    highestFourSetCount = count;
                }
            } else {
                if (count > highestTwoSetCount) {
                    highestTwoSetCount = count;
                }

                result.twoSetCounts.put(set, count);

                result.twoSetOccurrenceCounts.add(new TwoSetOccurrence(set, 1, count.floatValue()));
                result.twoSetOccurrenceCounts.add(new TwoSetOccurrence(set, 2, count.floatValue() * 2 / 3));
                result.twoSetOccurrenceCounts.add(new TwoSetOccurrence(set, 3, count.floatValue() * 2 / 3 * 2 / 3));

                twoSetCounts.add(count.floatValue());
                twoSetCounts.add(count.floatValue() * 2 / 3);
                twoSetCounts.add((count.floatValue() * 2 / 3) * 2 / 3);
            }
        }
        Collections.sort(result.twoSetOccurrenceCounts, (d1, d2) -> Float.compare(d2.count, d1.count));

        Collections.sort(twoSetCounts, (d1, d2) -> d2.intValue() - d1.intValue());

        float highestCount = twoSetCounts.size() > 0 ? twoSetCounts.get(0) : 0;
        float secondCount = twoSetCounts.size() > 1 ? twoSetCounts.get(1) : 0;
        float thirdCount = twoSetCounts.size() > 2 ? twoSetCounts.get(2) : 0;

        result.twoSetMax = highestCount + secondCount + thirdCount;

        for (Integer set : result.setCounts.keySet()) {
            float count = result.setCounts.get(set).floatValue();
            if (SwgohConstants.MOD_FOUR_SETS.contains(set)) {
                result.fourSetMultipliers.put(set, (count / highestFourSetCount));
            } else {
                result.fourSetMultipliers.put(set, (count / highestTwoSetCount));
            }
        }
    }

    private static void calculateSecondaryMultipliers(ModCalculatorCharacterResultsDto result) {
        float maxCount = 0;
        int maxSecondaryTypeCount = 0;

        for (Integer statId : result.secondaryCounts.keySet()) {
            if (result.secondaryCounts.get(statId).intValue() > maxCount) {
                maxCount = result.secondaryCounts.get(statId).intValue();
            }

            String statName = SwgohConstants.SECONDARY_NAME_MAP.get(statId);
            Integer count = result.secondaryTypeCounts.getOrDefault(statName, 0);

            if (statName == null) {
                throw new RuntimeException("Unable to find mapped name: " + statId);
            }
            int newCount = count + result.secondaryCounts.get(statId).intValue();
            result.secondaryTypeCounts.put(statName, newCount);

            if (newCount > maxSecondaryTypeCount) {
                maxSecondaryTypeCount = newCount;
            }

        }
        for (Integer statId : result.secondaryCounts.keySet()) {
            result.secondaryMultipliers.put(statId, result.secondaryCounts.get(statId).floatValue() / maxCount);
        }
        for (String statName : result.secondaryTypeCounts.keySet()) {
            result.secondaryTypeMultipliers.put(statName, result.secondaryTypeCounts.get(statName).floatValue() / maxSecondaryTypeCount);
        }
    }

    private static void calculatePrimaryMultipliers(ModCalculatorCharacterResultsDto result) {
        // calculate primaries
        for (Integer slot : result.primaryCounts.keySet()) {
            result.primaryMultipliers.put(slot, new HashMap<>());

            Integer highestCount = 0;
            for (Integer statId : result.primaryCounts.get(slot).keySet()) {
                Integer count = result.primaryCounts.get(slot).get(statId);
                if (highestCount.intValue() < count.intValue()) {
                    highestCount = count;
                }
            }
            for (Integer statId : result.primaryCounts.get(slot).keySet()) {
                Integer count = result.primaryCounts.get(slot).get(statId);
                result.primaryMultipliers.get(slot).put(statId, Float.valueOf(count.floatValue() / highestCount.floatValue()));
            }
        }
    }

    private static void calculateSetCountMultipliers(ModCalculatorCharacterResultsDto result) {
        // calculate sets
        float fourSetCounts = 0;
        float twoFourMax = 0;
        for (Integer set : result.setCounts.keySet()) {
            if (SwgohConstants.MOD_FOUR_SETS.contains(set)) {
                fourSetCounts = fourSetCounts + result.setCounts.get(set);
            }
        }
        twoFourMax = fourSetCounts > (result.count - fourSetCounts) ? fourSetCounts : (result.count - fourSetCounts);

        result.fourSetsMultiplier = fourSetCounts / twoFourMax;
        result.twoSetsMultiplier = (result.count - fourSetCounts) / twoFourMax;
    }

    private static void addMod(ModCalculatorCharacterResultsDto character, Mod mod) {

        // add set
        if (character.modsBySetCount.containsKey(mod.getSet()) == false) {
            character.modsBySetCount.put(mod.getSet(), 0);
        }
        Integer existingCount = character.modsBySetCount.get(mod.getSet());
        character.modsBySetCount.put(mod.getSet(), existingCount.intValue() + 1);

        // add primary
        if (character.primaryCounts.containsKey(mod.getSlot()) == false) {
            character.primaryCounts.put(mod.getSlot(), new HashMap<>());
        }
        if (character.primaryCounts.get(mod.getSlot()).containsKey(mod.getPrimaryStat().getStatId()) == false) {
            character.primaryCounts.get(mod.getSlot()).put(mod.getPrimaryStat().getStatId(), 0);
        }
        Integer existingPrimaryCount = character.primaryCounts.get(mod.getSlot()).get(mod.getPrimaryStat().getStatId());
        character.primaryCounts.get(mod.getSlot()).put(mod.getPrimaryStat().getStatId(), existingPrimaryCount.intValue() + 1);

        // add secondaries
        for (SecondaryStat secondaryStat : mod.getSecondaryStats()) {
            Integer currentCount = character.secondaryCounts.getOrDefault(secondaryStat.getStatId(), 0);
            character.secondaryCounts.put(secondaryStat.getStatId(), currentCount.intValue() + secondaryStat.getRoll().intValue());
        }
    }

    private static void calculatePlayerTotals(ModCalculatorCharacterResultsDto characterResult) {

        for (Integer setNumber : characterResult.modsBySetCount.keySet()) {

            Integer modCount = characterResult.modsBySetCount.get(setNumber);

            if (SwgohConstants.MOD_FOUR_SETS.contains(setNumber)) {
                characterResult.setCounts.put(setNumber, (int) Math.floor(modCount.doubleValue() / 4.0));
            } else {
                characterResult.setCounts.put(setNumber, (int) Math.floor(modCount.doubleValue() / 2.0));
            }
        }
    }


    private static void addCharacterResults(ModCalculatorResultsDto calcResults, List<ModCalculatorCharacterResultsDto> characterResults) {

        for (ModCalculatorCharacterResultsDto characterResult : characterResults) {

            ModsCalculator.calculatePlayerTotals(characterResult);

            ModCalculatorCharacterResultsDto existingResults = null;
            for (ModCalculatorCharacterResultsDto searchCharacter : calcResults.characterResults) {
                if (StringUtils.equals(searchCharacter.name, characterResult.name)) {
                    existingResults = searchCharacter;
                }
            }
            if (existingResults == null) {
                existingResults = new ModCalculatorCharacterResultsDto();
                existingResults.name = characterResult.name;
                calcResults.characterResults.add(existingResults);
            }
            ModsCalculator.addCharacterResult(existingResults, characterResult);
        }
    }

    private static void addCharacterResult(ModCalculatorCharacterResultsDto source, ModCalculatorCharacterResultsDto resultToAdd) {
        source.count = source.count + resultToAdd.count;

        for (Integer setNumber : resultToAdd.setCounts.keySet()) {
            Integer existingCount = 0;
            if (source.setCounts.containsKey(setNumber) == true) {
                existingCount = source.setCounts.get(setNumber);
            }
            source.setCounts.put(setNumber, existingCount + resultToAdd.setCounts.get(setNumber));
        }

        addPrimaryCounts(source, resultToAdd);

        // add secondaries
        for (Integer statId : resultToAdd.secondaryCounts.keySet()) {
            Integer currentCount = source.secondaryCounts.getOrDefault(statId, 0);
            source.secondaryCounts.put(statId, resultToAdd.secondaryCounts.get(statId));
        }
    }

    private static void addPrimaryCounts(ModCalculatorCharacterResultsDto source, ModCalculatorCharacterResultsDto resultToAdd) {
        for (Integer slot : resultToAdd.primaryCounts.keySet()) {
            for (Integer statId : resultToAdd.primaryCounts.get(slot).keySet()) {
                if (source.primaryCounts.containsKey(slot) == false) {
                    source.primaryCounts.put(slot, new HashMap<>());
                }
                Integer existingCount = 0;
                if (source.primaryCounts.get(slot).containsKey(statId) == true) {
                    existingCount = source.primaryCounts.get(slot).get(statId);
                }
                source.primaryCounts.get(slot).put(statId, existingCount + resultToAdd.primaryCounts.get(slot).get(statId));
            }
        }
    }
}
