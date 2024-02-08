package com.example.mystudyapp.domain;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.GetMapping;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;

    @Column
    private String userId;

    @Column
    private String name;
    @Column
    private Long priority;

    public Long getPriority() {
        return priority;
    }

    public Subject() {
    }

    public Subject(String userId, String name, Long priority) {
        this.userId = userId;
        this.name = name;
        this.priority = priority;
    }

    public long getIdx() {
        return idx;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }
}
