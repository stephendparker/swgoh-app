package com.strange.swgoh.swgohapp.data;

import com.strange.swgoh.swgohapp.data.dto.KeyValueDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@Component
public class SwgohGGDataService {

    Logger logger = LoggerFactory.getLogger(SwgohGGDataService.class);

    @Cacheable("player")
    public Object player(String allyCode) {

        String allyCodeFormatted = allyCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/player/" + allyCodeFormatted, HttpMethod.GET, entity, Object.class);
        return response;
    }

    @Cacheable("playerMods")
    public Object playerMods(String allyCode) {

        String allyCodeFormatted = allyCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/players/" + allyCodeFormatted + "/mods", HttpMethod.GET, entity, Object.class);
        return new KeyValueDto(allyCode, response);
    }


    @Cacheable("guild")
    public Object guild(String guildCode) {

        logger.info("getting non-cached guild: " + guildCode);

        String guildCodeFormatted = guildCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/guild/" + guildCodeFormatted, HttpMethod.GET, entity, Object.class);
        return response;
    }


    @Cacheable("characters")
    public Object characters() {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/characters/", HttpMethod.GET, entity, Object.class);
        return response;
    }

}
