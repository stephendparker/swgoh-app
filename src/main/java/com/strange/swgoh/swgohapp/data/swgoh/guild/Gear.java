
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
    "slot",
    "is_obtained",
    "base_id"
})
public class Gear {

    @JsonProperty("slot")
    private Integer slot;
    @JsonProperty("is_obtained")
    private Boolean isObtained;
    @JsonProperty("base_id")
    private String baseId;
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

    @JsonProperty("is_obtained")
    public Boolean getIsObtained() {
        return isObtained;
    }

    @JsonProperty("is_obtained")
    public void setIsObtained(Boolean isObtained) {
        this.isObtained = isObtained;
    }

    @JsonProperty("base_id")
    public String getBaseId() {
        return baseId;
    }

    @JsonProperty("base_id")
    public void setBaseId(String baseId) {
        this.baseId = baseId;
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
