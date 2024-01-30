package com.example.mystudyapp.controller;

public class TaskEditDTO {
    private String userId;
    private String subjectName;
    private String taskName;
    private String newName;

    public TaskEditDTO(String userId, String subjectName, String taskName, String newName) {
        this.userId = userId;
        this.subjectName = subjectName;
        this.taskName = taskName;
        this.newName = newName;
    }

    public String getUserId() {
        return userId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getNewName() {
        return newName;
    }
}
