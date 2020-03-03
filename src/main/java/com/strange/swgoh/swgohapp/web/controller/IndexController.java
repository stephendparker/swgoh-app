package com.strange.swgoh.swgohapp.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexController {

    @RequestMapping("/")
    public String index(){
        return "index.html";
    }

    @RequestMapping("/swgoh-tools/{resource}")
    public String redirect(@PathVariable String resource) {
        return "redirect:/" + resource;
    }
}
