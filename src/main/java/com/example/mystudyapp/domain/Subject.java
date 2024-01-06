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

    public Subject() {
    }

    public Subject(String userId, String name) {
        this.userId = userId;
        this.name = name;
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
