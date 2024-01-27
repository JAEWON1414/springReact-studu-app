package com.example.mystudyapp.controller;

public class SubjectEditDTO {
    private String userId;
    private String name;
    private String newName;

    public SubjectEditDTO(String userId, String name, String newName) {
        this.userId = userId;
        this.name = name;
        this.newName = newName;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getNewName() {
        return newName;
    }
}
