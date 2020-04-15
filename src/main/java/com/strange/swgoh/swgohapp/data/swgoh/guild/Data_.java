
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
    "arena",
    "arena_rank",
    "arena_leader_base_id",
    "last_updated",
    "name",
    "galactic_war_won",
    "ally_code",
    "galactic_power",
    "level",
    "pve_hard_won",
    "pve_battles_won",
    "character_galactic_power",
    "fleet_arena",
    "ship_galactic_power",
    "pvp_battles_won",
    "guild_exchange_donations",
    "url",
    "guild_contribution",
    "ship_battles_won",
    "guild_raid_won"
})
public class Data_ {

    @JsonProperty("arena")
    private Object arena;
    @JsonProperty("arena_rank")
    private Object arenaRank;
    @JsonProperty("arena_leader_base_id")
    private Object arenaLeaderBaseId;
    @JsonProperty("last_updated")
    private String lastUpdated;
    @JsonProperty("name")
    private String name;
    @JsonProperty("galactic_war_won")
    private Integer galacticWarWon;
    @JsonProperty("ally_code")
    private Integer allyCode;
    @JsonProperty("galactic_power")
    private Integer galacticPower;
    @JsonProperty("level")
    private Integer level;
    @JsonProperty("pve_hard_won")
    private Integer pveHardWon;
    @JsonProperty("pve_battles_won")
    private Integer pveBattlesWon;
    @JsonProperty("character_galactic_power")
    private Integer characterGalacticPower;
    @JsonProperty("fleet_arena")
    private Object fleetArena;
    @JsonProperty("ship_galactic_power")
    private Integer shipGalacticPower;
    @JsonProperty("pvp_battles_won")
    private Integer pvpBattlesWon;
    @JsonProperty("guild_exchange_donations")
    private Integer guildExchangeDonations;
    @JsonProperty("url")
    private String url;
    @JsonProperty("guild_contribution")
    private Integer guildContribution;
    @JsonProperty("ship_battles_won")
    private Integer shipBattlesWon;
    @JsonProperty("guild_raid_won")
    private Integer guildRaidWon;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("arena")
    public Object getArena() {
        return arena;
    }

    @JsonProperty("arena")
    public void setArena(Object arena) {
        this.arena = arena;
    }

    @JsonProperty("arena_rank")
    public Object getArenaRank() {
        return arenaRank;
    }

    @JsonProperty("arena_rank")
    public void setArenaRank(Object arenaRank) {
        this.arenaRank = arenaRank;
    }

    @JsonProperty("arena_leader_base_id")
    public Object getArenaLeaderBaseId() {
        return arenaLeaderBaseId;
    }

    @JsonProperty("arena_leader_base_id")
    public void setArenaLeaderBaseId(Object arenaLeaderBaseId) {
        this.arenaLeaderBaseId = arenaLeaderBaseId;
    }

    @JsonProperty("last_updated")
    public String getLastUpdated() {
        return lastUpdated;
    }

    @JsonProperty("last_updated")
    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("galactic_war_won")
    public Integer getGalacticWarWon() {
        return galacticWarWon;
    }

    @JsonProperty("galactic_war_won")
    public void setGalacticWarWon(Integer galacticWarWon) {
        this.galacticWarWon = galacticWarWon;
    }

    @JsonProperty("ally_code")
    public Integer getAllyCode() {
        return allyCode;
    }

    @JsonProperty("ally_code")
    public void setAllyCode(Integer allyCode) {
        this.allyCode = allyCode;
    }

    @JsonProperty("galactic_power")
    public Integer getGalacticPower() {
        return galacticPower;
    }

    @JsonProperty("galactic_power")
    public void setGalacticPower(Integer galacticPower) {
        this.galacticPower = galacticPower;
    }

    @JsonProperty("level")
    public Integer getLevel() {
        return level;
    }

    @JsonProperty("level")
    public void setLevel(Integer level) {
        this.level = level;
    }

    @JsonProperty("pve_hard_won")
    public Integer getPveHardWon() {
        return pveHardWon;
    }

    @JsonProperty("pve_hard_won")
    public void setPveHardWon(Integer pveHardWon) {
        this.pveHardWon = pveHardWon;
    }

    @JsonProperty("pve_battles_won")
    public Integer getPveBattlesWon() {
        return pveBattlesWon;
    }

    @JsonProperty("pve_battles_won")
    public void setPveBattlesWon(Integer pveBattlesWon) {
        this.pveBattlesWon = pveBattlesWon;
    }

    @JsonProperty("character_galactic_power")
    public Integer getCharacterGalacticPower() {
        return characterGalacticPower;
    }

    @JsonProperty("character_galactic_power")
    public void setCharacterGalacticPower(Integer characterGalacticPower) {
        this.characterGalacticPower = characterGalacticPower;
    }

    @JsonProperty("fleet_arena")
    public Object getFleetArena() {
        return fleetArena;
    }

    @JsonProperty("fleet_arena")
    public void setFleetArena(Object fleetArena) {
        this.fleetArena = fleetArena;
    }

    @JsonProperty("ship_galactic_power")
    public Integer getShipGalacticPower() {
        return shipGalacticPower;
    }

    @JsonProperty("ship_galactic_power")
    public void setShipGalacticPower(Integer shipGalacticPower) {
        this.shipGalacticPower = shipGalacticPower;
    }

    @JsonProperty("pvp_battles_won")
    public Integer getPvpBattlesWon() {
        return pvpBattlesWon;
    }

    @JsonProperty("pvp_battles_won")
    public void setPvpBattlesWon(Integer pvpBattlesWon) {
        this.pvpBattlesWon = pvpBattlesWon;
    }

    @JsonProperty("guild_exchange_donations")
    public Integer getGuildExchangeDonations() {
        return guildExchangeDonations;
    }

    @JsonProperty("guild_exchange_donations")
    public void setGuildExchangeDonations(Integer guildExchangeDonations) {
        this.guildExchangeDonations = guildExchangeDonations;
    }

    @JsonProperty("url")
    public String getUrl() {
        return url;
    }

    @JsonProperty("url")
    public void setUrl(String url) {
        this.url = url;
    }

    @JsonProperty("guild_contribution")
    public Integer getGuildContribution() {
        return guildContribution;
    }

    @JsonProperty("guild_contribution")
    public void setGuildContribution(Integer guildContribution) {
        this.guildContribution = guildContribution;
    }

    @JsonProperty("ship_battles_won")
    public Integer getShipBattlesWon() {
        return shipBattlesWon;
    }

    @JsonProperty("ship_battles_won")
    public void setShipBattlesWon(Integer shipBattlesWon) {
        this.shipBattlesWon = shipBattlesWon;
    }

    @JsonProperty("guild_raid_won")
    public Integer getGuildRaidWon() {
        return guildRaidWon;
    }

    @JsonProperty("guild_raid_won")
    public void setGuildRaidWon(Integer guildRaidWon) {
        this.guildRaidWon = guildRaidWon;
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
