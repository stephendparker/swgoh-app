package com.strange.swgoh.swgohapp.data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AppCacheManager {

    @Autowired
    SwgohGGDataService swgohGGDataService;

    Logger logger = LoggerFactory.getLogger(AppCacheManager.class);

    // https://javadeveloperzone.com/spring-boot/spring-cache-clear-all-cache/

    @Autowired
    private CacheManager cacheManager;               // autowire cache manager

    // run every 300 minutes
    @Scheduled(cron = "0 0/600 * * * ?")              // execure after every 30 min
    public void clearCacheSchedule(){
        logger.info("clearing application cache");
        for(String name:cacheManager.getCacheNames()){
            cacheManager.getCache(name).clear();            // clear cache by name
        }
        swgohGGDataService.refreshOptimizationData();
    }
}
