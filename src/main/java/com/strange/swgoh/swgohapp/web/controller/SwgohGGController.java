package com.strange.swgoh.swgohapp.web.controller;

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

    @RequestMapping("/player/{allyCode}")
    public Object getRefreshedPlayerData(@PathVariable String allyCode) {

        return swgohGGDataService.player(allyCode);

    }

    @RequestMapping("/players/{allyCode}/mods")
    public Object getRefreshedPlayerModsData(@PathVariable String allyCode) {

        return swgohGGDataService.playerMods(allyCode);
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
