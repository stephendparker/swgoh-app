package com.strange.swgoh.swgohapp.data;

import com.strange.swgoh.swgohapp.data.dto.Mod;
import com.strange.swgoh.swgohapp.data.mapper.HotUtilsMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class HotUtilsDataService {

    Logger logger = LoggerFactory.getLogger(SwgohGGDataService.class);

    public List<Mod> modList(String sessionId) {

        logger.info("getting non-cached player: " + sessionId);

        try {
            String url = "https://www.hotutils.app/HotService/swgoh/modlist/SessionId=" + sessionId + "&Action=Manage";
            System.out.println(url);
            Document modListHtml = Jsoup.connect(url).userAgent("Mozilla").maxBodySize(0).get();
            return HotUtilsMapper.mapMods(modListHtml);
        } catch (IOException ex) {
            throw new RuntimeException("Unable to get hotilts: " + ex.getMessage(), ex);
        }

    }
}
