package com.example.mystudyapp.domain;


import jakarta.persistence.*;
import org.springframework.web.bind.annotation.GetMapping;

@Entity
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idx;

    @Column
    private String userId;

    @Column
    private String subjectName;

    @Column
    private String chapterName;

    @Column
    private Integer chapterPercent;

    public Integer getChapterPercent() {
        return chapterPercent;
    }

    public Chapter() {
    }

    public Chapter(String userId, String subjectName, String chapterName, Integer chapterPercent) {
        this.userId = userId;
        this.subjectName = subjectName;
        this.chapterName = chapterName;
        this.chapterPercent = chapterPercent;
    }

    public long getIdx() {
        return idx;
    }

    public String getUserId() {
        return userId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public String getChapterName() {
        return chapterName;
    }
}
