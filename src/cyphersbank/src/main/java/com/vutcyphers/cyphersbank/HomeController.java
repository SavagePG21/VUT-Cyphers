package com.vutcyphers.cyphersbank;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("/")
    public static String home() {
        return "index.html";
    }
}
