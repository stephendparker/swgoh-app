
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
    "name",
    "member_count",
    "galactic_power",
    "rank",
    "profile_count",
    "id"
})
public class Data__ {

    @JsonProperty("name")
    private String name;
    @JsonProperty("member_count")
    private Integer memberCount;
    @JsonProperty("galactic_power")
    private Integer galacticPower;
    @JsonProperty("rank")
    private Integer rank;
    @JsonProperty("profile_count")
    private Integer profileCount;
    @JsonProperty("id")
    private Integer id;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("member_count")
    public Integer getMemberCount() {
        return memberCount;
    }

    @JsonProperty("member_count")
    public void setMemberCount(Integer memberCount) {
        this.memberCount = memberCount;
    }

    @JsonProperty("galactic_power")
    public Integer getGalacticPower() {
        return galacticPower;
    }

    @JsonProperty("galactic_power")
    public void setGalacticPower(Integer galacticPower) {
        this.galacticPower = galacticPower;
    }

    @JsonProperty("rank")
    public Integer getRank() {
        return rank;
    }

    @JsonProperty("rank")
    public void setRank(Integer rank) {
        this.rank = rank;
    }

    @JsonProperty("profile_count")
    public Integer getProfileCount() {
        return profileCount;
    }

    @JsonProperty("profile_count")
    public void setProfileCount(Integer profileCount) {
        this.profileCount = profileCount;
    }

    @JsonProperty("id")
    public Integer getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(Integer id) {
        this.id = id;
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
