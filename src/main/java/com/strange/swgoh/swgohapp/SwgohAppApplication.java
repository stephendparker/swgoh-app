package com.strange.swgoh.swgohapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.strange.swgoh")
public class SwgohAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwgohAppApplication.class, args);
	}

}
