package com.strange.swgoh.swgohapp.calculator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ModCalculatorCharacterResultsDto {

    public String name;
    public int count = 0;

    // ***MULTIPLIER FOR PRIMARIES
    public Map<Integer, Map<Integer, Float>> primaryMultipliers = new HashMap<>();
    // SLOT -> PRIMARY -> COUNT
    public Map<Integer, Map<Integer, Integer>> primaryCounts = new HashMap<>();

    // ***MULTIPLIER FOR FOUR SET
    public float fourSetsMultiplier = 0;
    // ***MULTIPLIER FOR TWO SET
    public float twoSetsMultiplier = 0;
    // SET -> COUNT
    public HashMap<Integer, Integer> setCounts = new HashMap<Integer, Integer>();

    // ***MULTIPLIER FOR FOUR SET SPECIFIC
    public Map<Integer, Float> fourSetMultipliers = new HashMap<>();
    public float twoSetMax = 0;
    public Map<Integer, Integer> twoSetCounts = new HashMap<>();

    // ***MULTIPLIER FOR TWO SET PIECES
    public List<TwoSetOccurrence> twoSetOccurrenceCounts = new ArrayList<>();

    public HashMap<Integer, Integer> modsBySetCount = new HashMap<Integer, Integer>();

    public String commonSet1Name;
    public String commonSet2Name;
    public String commonSet3Name;

    public Map<Integer, Integer> secondaryCounts = new HashMap<>();

    public Map<Integer, Float> secondaryMultipliers = new HashMap<>();

    public Map<String, Integer> secondaryTypeCounts = new HashMap<>();
    public Map<String, Float> secondaryTypeMultipliers = new HashMap<>();
}
