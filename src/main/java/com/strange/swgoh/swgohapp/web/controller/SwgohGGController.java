package com.strange.swgoh.swgohapp.web.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/api"})
public class SwgohGGController {

    @RequestMapping("/player/{allyCode}")
    public Object getRefreshedPlayerData(@PathVariable String allyCode) {

        String allyCodeFormatted = allyCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/player/" + allyCodeFormatted, HttpMethod.GET, entity, Object.class);
        return response;
    }

    @RequestMapping("/players/{allyCode}/mods")
    public Object getRefreshedPlayerModsData(@PathVariable String allyCode) {

        String allyCodeFormatted = allyCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/players/" + allyCodeFormatted + "/mods", HttpMethod.GET, entity, Object.class);
        return response;
    }


    @RequestMapping("/guild/{guildCode}")
    public Object getGuildData(@PathVariable String guildCode) {

        String guildCodeFormatted = guildCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/guild/" + guildCodeFormatted, HttpMethod.GET, entity, Object.class);
        return response;
    }


    @RequestMapping("/characters")
    public Object getCharacterData() {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/characters/", HttpMethod.GET, entity, Object.class);
        return response;
    }

}
