package com.vutcyphers.cyphersbank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class TransactionController {

    @Autowired
    private UserController userController;

    @Autowired
    private SmsService smsService;

    @GetMapping("/transaction")
    public String showTransactionForm(Model model) {
        model.addAttribute("transaction", new Transaction());
        return "transaction";
    }

    @PostMapping("/transaction")
    public String processTransaction(@ModelAttribute Transaction transaction, Model model) {
        User user = userController.findUserByUsername(transaction.getUsername());

        if (user == null) {
            model.addAttribute("message", "❌ User not found.");
            return "result";
        }

        if (transaction.getPin().equals(user.getEmergencyPin())) {
            smsService.sendAlert("🚨 Emergency PIN used by " + user.getUsername() + " for transaction of R" + transaction.getAmount());
            model.addAttribute("message", "✅ Transaction successful. Law enforcement has been notified.");
        } else if (transaction.getPin().equals(user.getOriginalPin())) {
            model.addAttribute("message", "✅ Transaction successful.");
        } else {
            model.addAttribute("message", "❌ Invalid PIN.");
        }

        return "result";
    }
}
