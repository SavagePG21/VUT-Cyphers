package com.vutcyphers.cyphersbank.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    // Hardcoded credentials
    private final String validUsername = "admin";
    private final String validPassword = "1234";

    @GetMapping("/")
    public String showLoginForm() {
        return "index.html"; //
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam String loginUsername,
                               @RequestParam String loginPassword,
                               Model model) {
        if (loginUsername.equals(validUsername) && loginPassword.equals(validPassword)) {
            model.addAttribute("message", "Login successful!");
            return "redirect:../static/html/cyphersbank.html";

        } else {
            model.addAttribute("error", "Invalid username or password");
            return "index.html";
        }
    }

    @GetMapping("/dashboard")
    public String showDashboard() {
        return "cyphersbank.html";
    }
}
