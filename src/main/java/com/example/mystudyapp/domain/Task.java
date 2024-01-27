package com.example.mystudyapp.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;
    @Column
    private String userId;
    @Column
    private String subjectName;
    @Column
    private String taskName;

    @Column
    private Integer year;
    @Column
    private Integer month;
    @Column
    private Integer day;

    @Column
    private boolean checked;

    public Task() {
    }

    public Task( String userId, String subjectName, String taskName, Integer year, Integer month, Integer day) {
        this.userId = userId;
        this.subjectName = subjectName;
        this.taskName = taskName;
        this.year = year;
        this.month = month;
        this.day = day;
        this.checked = false;
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

    public long getIdx() {
        return idx;
    }

    public Integer getYear() {
        return year;
    }

    public Integer getMonth() {
        return month;
    }

    public Integer getDay() {
        return day;
    }

    public boolean isChecked() {
        return checked;
    }
}
