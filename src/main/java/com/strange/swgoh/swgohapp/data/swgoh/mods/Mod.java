
package com.strange.swgoh.swgohapp.data.swgoh.mods;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "slot",
    "secondary_stats",
    "set",
    "level",
    "tier",
    "primary_stat",
    "character",
    "id",
    "rarity"
})
public class Mod {

    @JsonProperty("slot")
    private Integer slot;
    @JsonProperty("secondary_stats")
    private List<SecondaryStat> secondaryStats = null;
    @JsonProperty("set")
    private Integer set;
    @JsonProperty("level")
    private Integer level;
    @JsonProperty("tier")
    private Integer tier;
    @JsonProperty("primary_stat")
    private PrimaryStat primaryStat;
    @JsonProperty("character")
    private String character;
    @JsonProperty("id")
    private String id;
    @JsonProperty("rarity")
    private Integer rarity;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("slot")
    public Integer getSlot() {
        return slot;
    }

    @JsonProperty("slot")
    public void setSlot(Integer slot) {
        this.slot = slot;
    }

    @JsonProperty("secondary_stats")
    public List<SecondaryStat> getSecondaryStats() {
        return secondaryStats;
    }

    @JsonProperty("secondary_stats")
    public void setSecondaryStats(List<SecondaryStat> secondaryStats) {
        this.secondaryStats = secondaryStats;
    }

    @JsonProperty("set")
    public Integer getSet() {
        return set;
    }

    @JsonProperty("set")
    public void setSet(Integer set) {
        this.set = set;
    }

    @JsonProperty("level")
    public Integer getLevel() {
        return level;
    }

    @JsonProperty("level")
    public void setLevel(Integer level) {
        this.level = level;
    }

    @JsonProperty("tier")
    public Integer getTier() {
        return tier;
    }

    @JsonProperty("tier")
    public void setTier(Integer tier) {
        this.tier = tier;
    }

    @JsonProperty("primary_stat")
    public PrimaryStat getPrimaryStat() {
        return primaryStat;
    }

    @JsonProperty("primary_stat")
    public void setPrimaryStat(PrimaryStat primaryStat) {
        this.primaryStat = primaryStat;
    }

    @JsonProperty("character")
    public String getCharacter() {
        return character;
    }

    @JsonProperty("character")
    public void setCharacter(String character) {
        this.character = character;
    }

    @JsonProperty("id")
    public String getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("rarity")
    public Integer getRarity() {
        return rarity;
    }

    @JsonProperty("rarity")
    public void setRarity(Integer rarity) {
        this.rarity = rarity;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
