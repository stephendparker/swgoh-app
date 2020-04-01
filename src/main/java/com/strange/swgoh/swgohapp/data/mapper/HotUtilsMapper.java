package com.strange.swgoh.swgohapp.data.mapper;

import com.strange.swgoh.swgohapp.data.dto.Mod;
import com.strange.swgoh.swgohapp.data.dto.ModPrimaryStat;
import com.strange.swgoh.swgohapp.data.dto.ModSecondaryStats;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.List;

public class HotUtilsMapper {


    public static int MOD_HEALTH_STAT_ID = 1;
    public static int MOD_HEALTH_PERCENT_STAT_ID = 55;
    public static int MOD_PROTECTION_STAT_ID = 28;
    public static int MOD_PROTECTION_PERCENT_STAT_ID = 56;
    public static int MOD_OFFENSE_STAT_ID = 41;
    public static int MOD_OFFENSE_PERCENT_STAT_ID = 48;
    public static int MOD_DEFENSE_STAT_ID = 42;
    public static int MOD_DEFENSE_PERCENT_STAT_ID = 49;
    public static int MOD_CRIT_CHANCE_STAT_ID = 53;
    public static int MOD_CRIT_DMG_STAT_ID = 16;
    public static int MOD_POTENCY_STAT_ID = 17;
    public static int MOD_SPEED_STAT_ID = 5;
    public static int MOD_TENACITY_STAT_ID = 18;
    public static int MOD_CRIT_AVOIDANCE_STAT_ID = 52;
    public static int MOD_ACCURACY_STAT_ID = 54;



    //<div id="modAZDq7MY5TFO7ECiBP4IPdw" class="mod-summary mod-content-item mod-selected mod-locked mod-upgradeable" onclick="ToggleMod('incomplete', 'AZDq7MY5TFO7ECiBP4IPdw');">
    //  <div class="mod-dots mod-content-item" >
    //   <div class="mod-dot mod-content-item" ></div>
    //  </div>
    //  <div class="mod Std2-1  mod-content-item" >
    //   <div class="mod-content-item mod-icon icon-slot2 icon-set-1-1"></div>
    //  </div>
    //  <div class="mod-content-item mod-stats" >
    //    <div class="mod-content-item stat-primary" >+19 Speed</div>
    //    <div class="mod-content-item stat-secondary roll-1" >+9 Defense (1)</div>
    //    <div class="mod-content-item stat-secondary roll-1" >+1.74% Potency (1)</div>
    //    <div class="mod-content-item stat-secondary roll-1" >+32 Offense (1)</div>
    //    <div class="mod-content-item mod-level" >9</div>
    //  </div>
    //<div style="white-space: pre-line;" title="Locked In Game" class="mod-locked-image"/></div>
    //
    //<div id="modREQrkMq8RNakbHoZrdtczg" class="mod-summary mod-content-item mod-locked" onclick="ToggleMod('remaining', 'REQrkMq8RNakbHoZrdtczg');">
    //  <div class="mod-dots mod-content-item" >
    //   <div class="mod-dot mod-content-item" ></div>
    //   <div class="mod-dot mod-content-item" ></div>
    //   <div class="mod-dot mod-content-item" ></div>
    //   <div class="mod-dot mod-content-item" ></div>
    //   <div class="mod-dot mod-content-item" ></div>
    //  </div>
    //  <div class="mod Std4-5  mod-content-item" >
    //   <div class="mod-content-item mod-icon icon-slot4 icon-set-4-5"></div>
    //  </div>
    //  <div class="mod-content-item mod-stats" >
    //    <div class="mod-content-item stat-primary" >+36% Crit Damage</div>
    //    <div class="mod-content-item stat-secondary roll-4" >+135 Offense (4)</div>
    //    <div class="mod-content-item stat-secondary roll-2" >+3.14% Tenacity (2)</div>
    //    <div class="mod-content-item stat-secondary roll-1" >+820 Protection (1)</div>
    //    <div class="mod-content-item stat-secondary roll-1" >+1% Defense (1)</div>
    //  </div>
    //<div style="white-space: pre-line; background-image: url('images/units/tex.charui_canderous.png"');" title ="Locked In Game" class="mod-character-image"/></div>

    public static ModPrimaryStat mapPrimaryStat(Element modElement) {
        ModPrimaryStat retVal = new ModPrimaryStat();

        String text = modElement.text();
        String[] bonusPieces = text.split(" ");
        String amountText = bonusPieces[0].replace("%", "");
        float amount = Float.parseFloat(amountText);

        retVal.display_value = amount + "%";
        retVal.value = amount * 100;

        if (text.contains("Offense")) {
            retVal.name = "Offense";
            retVal.stat_id = MOD_OFFENSE_PERCENT_STAT_ID;
        }
        if (text.contains("Defense")) {
            retVal.name = "Defense";
            retVal.stat_id = MOD_DEFENSE_PERCENT_STAT_ID;
        }
        if (text.contains("Speed")) {
            retVal.name = "Speed";
            retVal.display_value = amount + "";
            retVal.stat_id = MOD_SPEED_STAT_ID;
            retVal.value = amount * 10000;

        }
        if (text.contains("Protection")) {
            retVal.name = "Protection";
            retVal.stat_id = MOD_PROTECTION_PERCENT_STAT_ID;
        }
        if (text.contains("Health")) {
            retVal.name = "Health";
            retVal.stat_id = MOD_HEALTH_PERCENT_STAT_ID;
        }
        if (text.contains("Crit Avoid")) {
            retVal.name = "Critical Avoidance";
            retVal.stat_id = MOD_CRIT_AVOIDANCE_STAT_ID;
        }
        if (text.contains("Crit Chance")) {
            retVal.name = "Critical Chance";
            retVal.stat_id = MOD_CRIT_CHANCE_STAT_ID;
        }
        if (text.contains("Accuracy")) {
            retVal.name = "Accuracy";
            retVal.stat_id = MOD_ACCURACY_STAT_ID;
        }
        if (text.contains("Crit Damage")) {
            retVal.name = "Critical Damage";
            retVal.stat_id = MOD_CRIT_DMG_STAT_ID;
        }
        if (text.contains("Tenacity")) {
            retVal.name = "Tenacity";
            retVal.stat_id = MOD_TENACITY_STAT_ID;
        }
        if (text.contains("Potency")) {
            retVal.name = "Potency";
            retVal.stat_id = MOD_POTENCY_STAT_ID;
        }
        return retVal;
    }

    public static ModSecondaryStats mapSecondaryStat(Element modElement) {
        ModSecondaryStats retVal = new ModSecondaryStats();

        String modClass = modElement.attr("class");

        int rollStart = "mod-content-item stat-secondary roll-".length();
        retVal.roll = Integer.valueOf(modClass.substring(rollStart, rollStart + 1));

        String bonusText = modElement.text();
        String[] bonusPieces = bonusText.split(" ");
        String amountText = bonusPieces[0].replace("%", "");
        float amount = Float.parseFloat(amountText);
        retVal.display_value = "" + amount;
        retVal.value = amount;

        if (bonusText.contains("Offense")) {
            retVal.name = "Offense";
            if (bonusText.contains("%")) {
                retVal.stat_id = HotUtilsMapper.MOD_OFFENSE_PERCENT_STAT_ID;
                retVal.value = amount * 100;
                retVal.display_value = amount + "%";
            } else {
                retVal.stat_id = HotUtilsMapper.MOD_OFFENSE_STAT_ID;
                retVal.value = amount * 10000;
            }
        }

        if (bonusText.contains("Protection")) {
            retVal.name = "Protection";
            if (bonusText.contains("%")) {
                retVal.stat_id = HotUtilsMapper.MOD_PROTECTION_PERCENT_STAT_ID;
                retVal.value = amount * 100;
                retVal.display_value = amount + "%";
            } else {
                retVal.stat_id = HotUtilsMapper.MOD_PROTECTION_STAT_ID;
                retVal.value = amount * 10000;
            }
        }
        if (bonusText.contains("Defense")) {
            retVal.name = "Defense";
            if (bonusText.contains("%")) {
                retVal.stat_id = HotUtilsMapper.MOD_DEFENSE_PERCENT_STAT_ID;
                retVal.value = amount * 100;
                retVal.display_value = amount + "%";
            } else {
                retVal.stat_id = HotUtilsMapper.MOD_DEFENSE_STAT_ID;
                retVal.value = amount * 10000;
            }
        }
        if (bonusText.contains("Tenacity")) {
            retVal.name = "Tenacity";
            retVal.stat_id = HotUtilsMapper.MOD_TENACITY_STAT_ID;
            retVal.value = amount * 100;
            retVal.display_value = amount + "%";
        }
        if (bonusText.contains("Potency")) {
            retVal.name = "Potency";
            retVal.stat_id = HotUtilsMapper.MOD_POTENCY_STAT_ID;
            retVal.value = amount * 100;
        }
        if (bonusText.contains("Crit Chance")) {
            retVal.name = "Critical Chance";
            retVal.stat_id = HotUtilsMapper.MOD_CRIT_CHANCE_STAT_ID;
            retVal.value = amount * 100;
        }
        if (bonusText.contains("Speed")) {
            retVal.name = "Speed";
            retVal.stat_id = HotUtilsMapper.MOD_SPEED_STAT_ID;
            retVal.value = amount * 10000;
        }
        if (bonusText.contains("Health")) {
            retVal.name = "Health";
            if (bonusText.contains("%")) {
                retVal.stat_id = HotUtilsMapper.MOD_HEALTH_PERCENT_STAT_ID;
                retVal.value = amount * 100;
                retVal.display_value = amount + "%";
            } else {
                retVal.stat_id = HotUtilsMapper.MOD_HEALTH_STAT_ID;
                retVal.value = amount * 10000;
            }
        }
        if (bonusText.contains("Maxhealth")) {
            retVal.name = "Health";
            if (bonusText.contains("%")) {
                retVal.stat_id = HotUtilsMapper.MOD_HEALTH_PERCENT_STAT_ID;
                retVal.value = amount * 100;
                retVal.display_value = amount + "%";
            } else {
                retVal.stat_id = HotUtilsMapper.MOD_HEALTH_STAT_ID;
                retVal.value = amount * 10000;
            }
        }



        return retVal;
    }

    public static List<Mod> mapMods(Document modListDocument) {
        List<Mod> retVal = new ArrayList<>();

        List<String> usedMods = new ArrayList<>();

        Elements modElements = modListDocument.select(".mod-summary");
        System.out.println("total mods found: " + modElements.size());
        for (Element modElement : modElements) {
//            System.out.println("processing modId: " + modElement.id());
            Mod newMod = new Mod();
            newMod.id = modElement.id().replace("mod", "");

            Elements modDotsElements = modElement.select(".mod-dots");
            Elements modDotElements = modDotsElements.get(0).select(".mod-dot");
            newMod.rarity = modDotElements.size();

            Elements modCharacterImageElement = modElement.select(".mod-character-image");

            Elements modElementList = modElement.select(".mod");
            Element mod = modElementList.get(0);
            String modClass = mod.attr("class");

            int slotStart = "mod Std".length();
            newMod.slot = Integer.valueOf(modClass.substring(slotStart, slotStart + 1));

            int tierStart = "mod Std4-".length();
            newMod.tier = Integer.valueOf(modClass.substring(tierStart, tierStart + 1));

            Elements modIconSets = mod.select(".mod-icon");
            Element modIconSet = modIconSets.get(0);

            String modIconSetClass = modIconSet.attr("class");
            int setStart = "mod-content-item mod-icon icon-slot4 icon-set-".length();
            newMod.set = Integer.valueOf(modIconSetClass.substring(setStart, setStart + 1));


            Elements modStatsList = modElement.select(".mod-stats");
            Element modStats = modStatsList.get(0);

            Elements statPrimaryElements = modStats.select(".stat-primary");
            Element statPrimaryElement = statPrimaryElements.get(0);

            newMod.primary_stat = HotUtilsMapper.mapPrimaryStat(statPrimaryElement);


            Elements statSecondaryElements = modStats.select(".stat-secondary");
            if (statSecondaryElements != null && statSecondaryElements.size() > 0) {
                for (Element statSecondaryElement : statSecondaryElements) {
                    newMod.secondary_stats.add(HotUtilsMapper.mapSecondaryStat(statSecondaryElement));
                }
            }


            Elements modLevel = modStats.select(".mod-level");
            if (modLevel != null && modLevel.size() > 0) {
                newMod.level = Integer.valueOf(modLevel.get(0).text());
            } else {
                newMod.level = 15;
            }

            if (newMod.id.compareTo("PNjIAsV9S1qcDqW3MUGpHw") == 0) {
                System.out.println("found mod: " + modCharacterImageElement != null || modCharacterImageElement.size() > 0);
                System.out.println("found mod: " + modCharacterImageElement != null || modCharacterImageElement.size() > 0);
            }

            // we only care about un-equipped mods.
           if (modCharacterImageElement == null || modCharacterImageElement.size() == 0) {
               if (usedMods.contains(newMod.id) == false) {
                   retVal.add(newMod);
                   usedMods.add(newMod.id);
               } else {
                   System.out.println("Found duplicate: " + newMod.id);
               }
            }
        }

        return retVal;
    }
}
