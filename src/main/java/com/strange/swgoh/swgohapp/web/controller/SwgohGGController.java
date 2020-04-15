package com.strange.swgoh.swgohapp.web.controller;

import com.strange.swgoh.swgohapp.calculator.ModCalculatorResultsDto;
import com.strange.swgoh.swgohapp.data.HotUtilsDataService;
import com.strange.swgoh.swgohapp.data.SwgohGGDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/api"})
public class SwgohGGController {

    @Autowired
    SwgohGGDataService swgohGGDataService;

    @Autowired
    HotUtilsDataService hotUtilsDataService;

    @RequestMapping("/player/{allyCode}")
    public Object getRefreshedPlayerData(@PathVariable String allyCode) {

        return swgohGGDataService.player(allyCode);

    }

    // TODO move this into seperate controller
    @RequestMapping("/hotutils/player/{sessionId}/mods")
    public Object getHotutilsModList(@PathVariable String sessionId) {

        return hotUtilsDataService.modList(sessionId);

    }

    @RequestMapping("/players/{allyCode}/mods")
    public Object getRefreshedPlayerModsData(@PathVariable String allyCode) {

        return swgohGGDataService.playerMods(allyCode);
    }

    @RequestMapping("/gear")
    public Object gear() {

        return swgohGGDataService.gear();
    }

    @RequestMapping(value = "/mods/optimization")
    public ModCalculatorResultsDto getOtimizationData() {

        return swgohGGDataService.getOptimizationData();
    }

    @RequestMapping(value = "/list/players/mods", method = RequestMethod.POST)
    public Object getRefreshedPlayerListModsData(@RequestBody int[] allyCodes) {
        List<Object> playerListMods = new ArrayList<>();

        for (int allyCode: allyCodes) {
                playerListMods.add(swgohGGDataService.playerMods(allyCode + ""));
        }
        return playerListMods;
    }


    @RequestMapping("/guild/{guildCode}")
    public Object getGuildData(@PathVariable String guildCode) {

        return swgohGGDataService.guild(guildCode);
    }


    @RequestMapping("/characters")
    public Object getCharacterData() {

        return swgohGGDataService.characters();
    }

}
