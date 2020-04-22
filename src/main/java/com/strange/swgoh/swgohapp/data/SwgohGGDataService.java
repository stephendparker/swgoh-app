package com.strange.swgoh.swgohapp.data;

import com.strange.swgoh.swgohapp.calculator.ModCalculatorResultsDto;
import com.strange.swgoh.swgohapp.calculator.ModsCalculator;
import com.strange.swgoh.swgohapp.data.dto.KeyValueDto;
import com.strange.swgoh.swgohapp.data.swgoh.guild.Guild;
import com.strange.swgoh.swgohapp.data.swgoh.guild.Player;
import com.strange.swgoh.swgohapp.data.swgoh.mods.Mods;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SwgohGGDataService {

    static Logger logger = LoggerFactory.getLogger(SwgohGGDataService.class);

    ModCalculatorResultsDto optimizationData;

    @PostConstruct
    public void init() {
        this.refreshOptimizationData();
    }

    @Cacheable("playerModsMapped")
    public static Mods playerModsMapped(String allyCode) {

        logger.info("getting non-cached playerMods: " + allyCode);

        String allyCodeFormatted = allyCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        //  Mods response = restTemplate.getForObject("https://swgoh.gg/api/players/" + allyCodeFormatted + "/mods", Mods.class);
        ResponseEntity<Mods> response = restTemplate.exchange("https://swgoh.gg/api/players/" + allyCodeFormatted + "/mods", HttpMethod.GET, entity, Mods.class);

        return response.getBody();
    }

    @Cacheable("guild")
    public static Guild guildMapped(String guildCode) {

        logger.info("getting non-cached guild: " + guildCode);

        String guildCodeFormatted = guildCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        ResponseEntity<Guild> response = restTemplate.exchange("https://swgoh.gg/api/guild/" + guildCodeFormatted, HttpMethod.GET, entity, Guild.class);

        return response.getBody();
    }

    @Cacheable("player")
    public Object player(String allyCode) {

        logger.info("getting non-cached playerMods: " + allyCode);

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

        logger.info("getting non-cached playerMods: " + allyCode);

        String allyCodeFormatted = allyCode.replaceAll("-", "");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/players/" + allyCodeFormatted + "/mods", HttpMethod.GET, entity, Object.class);
        return new KeyValueDto(allyCode, response);
    }

    @Cacheable("gear")
    public Object gear() {

        logger.info("getting non-cached gear");

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/gear", HttpMethod.GET, entity, Object.class);
        return response;
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

        logger.info("getting non-cached characters");

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

        Object response = restTemplate.exchange("https://swgoh.gg/api/characters/", HttpMethod.GET, entity, Object.class);
        return response;
    }

    public ModCalculatorResultsDto getOptimizationData() {
        return optimizationData;
    }

    public void refreshOptimizationData() {
        Guild optimizationGuild = guildMapped("259");
        List<Mods> modsList = new ArrayList<>();

        int count = 0;
        for (Player player : optimizationGuild.getPlayers()) {

            if (count < 50) {
                count = count + 1;
                modsList.add(playerModsMapped(player.getData().getAllyCode().toString()));
            }
        }

        optimizationData = ModsCalculator.calculateMods(modsList);
    }
}
