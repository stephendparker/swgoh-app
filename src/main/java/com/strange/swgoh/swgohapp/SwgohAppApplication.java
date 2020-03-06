package com.strange.swgoh.swgohapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAutoConfiguration
@SpringBootApplication
@EnableCaching
@EnableScheduling
@ComponentScan("com.strange.swgoh")
public class SwgohAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwgohAppApplication.class, args);
	}

}
