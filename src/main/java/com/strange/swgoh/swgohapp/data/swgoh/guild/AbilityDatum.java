
package com.strange.swgoh.swgohapp.data.swgoh.guild;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "is_omega",
    "is_zeta",
    "name",
    "ability_tier",
    "id",
    "tier_max"
})
public class AbilityDatum {

    @JsonProperty("is_omega")
    private Boolean isOmega;
    @JsonProperty("is_zeta")
    private Boolean isZeta;
    @JsonProperty("name")
    private String name;
    @JsonProperty("ability_tier")
    private Integer abilityTier;
    @JsonProperty("id")
    private String id;
    @JsonProperty("tier_max")
    private Integer tierMax;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("is_omega")
    public Boolean getIsOmega() {
        return isOmega;
    }

    @JsonProperty("is_omega")
    public void setIsOmega(Boolean isOmega) {
        this.isOmega = isOmega;
    }

    @JsonProperty("is_zeta")
    public Boolean getIsZeta() {
        return isZeta;
    }

    @JsonProperty("is_zeta")
    public void setIsZeta(Boolean isZeta) {
        this.isZeta = isZeta;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("ability_tier")
    public Integer getAbilityTier() {
        return abilityTier;
    }

    @JsonProperty("ability_tier")
    public void setAbilityTier(Integer abilityTier) {
        this.abilityTier = abilityTier;
    }

    @JsonProperty("id")
    public String getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("tier_max")
    public Integer getTierMax() {
        return tierMax;
    }

    @JsonProperty("tier_max")
    public void setTierMax(Integer tierMax) {
        this.tierMax = tierMax;
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
