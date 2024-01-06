package com.example.mystudyapp.domain;

import jakarta.persistence.*;

@Entity
public class Item {
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
    private String itemName;

    @Column
    private boolean checked;

    public Item() {
    }

    public Item(String userId, String subjectName, String chapterName, String itemName) {
        this.userId = userId;
        this.subjectName = subjectName;
        this.chapterName = chapterName;
        this.itemName = itemName;
        this.checked = false;
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

    public String getItemName() {
        return itemName;
    }

    public boolean isChecked() {
        return checked;
    }
}
