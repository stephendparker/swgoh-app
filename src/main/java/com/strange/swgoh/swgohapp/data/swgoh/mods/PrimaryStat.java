
package com.strange.swgoh.swgohapp.data.swgoh.mods;

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
    "stat_id",
    "name",
    "value",
    "display_value"
})
public class PrimaryStat {

    @JsonProperty("stat_id")
    private Integer statId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("value")
    private Double value;
    @JsonProperty("display_value")
    private String displayValue;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("stat_id")
    public Integer getStatId() {
        return statId;
    }

    @JsonProperty("stat_id")
    public void setStatId(Integer statId) {
        this.statId = statId;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("value")
    public Double getValue() {
        return value;
    }

    @JsonProperty("value")
    public void setValue(Double value) {
        this.value = value;
    }

    @JsonProperty("display_value")
    public String getDisplayValue() {
        return displayValue;
    }

    @JsonProperty("display_value")
    public void setDisplayValue(String displayValue) {
        this.displayValue = displayValue;
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
