package com.vutcyphers.cyphersbank.model;

public class User {
    private String username;
    private String password;
    private String originalPin;
    private String emergencyPin;

    public User() {}

    public User(String username, String password, String originalPin, String emergencyPin) {
        this.username = username;
        this.password = password;
        this.originalPin = originalPin;
        this.emergencyPin = emergencyPin;
    }

    // Getters and setters
    //Ketla dibona geke tsoga
}
