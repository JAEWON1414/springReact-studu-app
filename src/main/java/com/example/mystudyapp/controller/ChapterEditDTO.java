package com.example.mystudyapp.controller;

public class ChapterEditDTO {
    private String userId;
    private String name;
    private String newName;
    private String subjectName;

    public ChapterEditDTO(String userId, String name, String newName, String subjectName) {
        this.userId = userId;
        this.name = name;
        this.newName = newName;
        this.subjectName = subjectName;
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

    public String getSubjectName() {
        return subjectName;
    }
}
