package com.vutcyphers.cyphersbank;

package com.cyphersbank.controller;

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
        return "login"; // Renders login.html
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam String username,
                               @RequestParam String password,
                               Model model) {
        if (username.equals(validUsername) && password.equals(validPassword)) {
            return "redirect:/dashboard";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }

    @GetMapping("/dashboard")
    public String showDashboard() {
        return "dashboard"; // Renders dashboard.html
    }
}
