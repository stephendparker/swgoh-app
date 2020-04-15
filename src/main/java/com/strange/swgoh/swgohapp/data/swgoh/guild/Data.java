
package com.strange.swgoh.swgohapp.data.swgoh.guild;

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
    "relic_tier",
    "gear_level",
    "gear",
    "power",
    "level",
    "url",
    "name",
    "combat_type",
    "mod_set_ids",
    "rarity",
    "base_id",
    "stats",
    "ability_data",
    "zeta_abilities"
})
public class Data {

    @JsonProperty("relic_tier")
    private Integer relicTier;
    @JsonProperty("gear_level")
    private Integer gearLevel;
    @JsonProperty("gear")
    private List<Gear> gear = null;
    @JsonProperty("power")
    private Integer power;
    @JsonProperty("level")
    private Integer level;
    @JsonProperty("url")
    private String url;
    @JsonProperty("name")
    private String name;
    @JsonProperty("combat_type")
    private Integer combatType;
    @JsonProperty("mod_set_ids")
    private List<String> modSetIds = null;
    @JsonProperty("rarity")
    private Integer rarity;
    @JsonProperty("base_id")
    private String baseId;
    @JsonProperty("stats")
    private Stats stats;
    @JsonProperty("ability_data")
    private List<AbilityDatum> abilityData = null;
    @JsonProperty("zeta_abilities")
    private List<Object> zetaAbilities = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("relic_tier")
    public Integer getRelicTier() {
        return relicTier;
    }

    @JsonProperty("relic_tier")
    public void setRelicTier(Integer relicTier) {
        this.relicTier = relicTier;
    }

    @JsonProperty("gear_level")
    public Integer getGearLevel() {
        return gearLevel;
    }

    @JsonProperty("gear_level")
    public void setGearLevel(Integer gearLevel) {
        this.gearLevel = gearLevel;
    }

    @JsonProperty("gear")
    public List<Gear> getGear() {
        return gear;
    }

    @JsonProperty("gear")
    public void setGear(List<Gear> gear) {
        this.gear = gear;
    }

    @JsonProperty("power")
    public Integer getPower() {
        return power;
    }

    @JsonProperty("power")
    public void setPower(Integer power) {
        this.power = power;
    }

    @JsonProperty("level")
    public Integer getLevel() {
        return level;
    }

    @JsonProperty("level")
    public void setLevel(Integer level) {
        this.level = level;
    }

    @JsonProperty("url")
    public String getUrl() {
        return url;
    }

    @JsonProperty("url")
    public void setUrl(String url) {
        this.url = url;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("combat_type")
    public Integer getCombatType() {
        return combatType;
    }

    @JsonProperty("combat_type")
    public void setCombatType(Integer combatType) {
        this.combatType = combatType;
    }

    @JsonProperty("mod_set_ids")
    public List<String> getModSetIds() {
        return modSetIds;
    }

    @JsonProperty("mod_set_ids")
    public void setModSetIds(List<String> modSetIds) {
        this.modSetIds = modSetIds;
    }

    @JsonProperty("rarity")
    public Integer getRarity() {
        return rarity;
    }

    @JsonProperty("rarity")
    public void setRarity(Integer rarity) {
        this.rarity = rarity;
    }

    @JsonProperty("base_id")
    public String getBaseId() {
        return baseId;
    }

    @JsonProperty("base_id")
    public void setBaseId(String baseId) {
        this.baseId = baseId;
    }

    @JsonProperty("stats")
    public Stats getStats() {
        return stats;
    }

    @JsonProperty("stats")
    public void setStats(Stats stats) {
        this.stats = stats;
    }

    @JsonProperty("ability_data")
    public List<AbilityDatum> getAbilityData() {
        return abilityData;
    }

    @JsonProperty("ability_data")
    public void setAbilityData(List<AbilityDatum> abilityData) {
        this.abilityData = abilityData;
    }

    @JsonProperty("zeta_abilities")
    public List<Object> getZetaAbilities() {
        return zetaAbilities;
    }

    @JsonProperty("zeta_abilities")
    public void setZetaAbilities(List<Object> zetaAbilities) {
        this.zetaAbilities = zetaAbilities;
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
