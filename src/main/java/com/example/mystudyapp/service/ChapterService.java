package com.example.mystudyapp.service;


import com.example.mystudyapp.domain.Chapter;
import com.example.mystudyapp.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChapterService {
    private final ChapterRepository chapterRepository;

    @Autowired
    public ChapterService(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }

    public boolean join(String userId, String subjectName, String chapterName) {
        Chapter chapter = new Chapter(userId, subjectName, chapterName, false);
        chapterRepository.save(chapter);
        return true;
    }

    public List<Chapter> findChaptersByUserId(String userId, String subjectName) {
        return chapterRepository.findChaptersByUserId(userId, subjectName);
    }

    public int updateChecked(String userId, String subjectName, String chapterName, boolean checked) {
        return chapterRepository.updateChecked(userId, subjectName, chapterName, checked);
    }

    public int delete(String userId, String subjectName, String chapterName) {
        chapterRepository.delete(userId, subjectName, chapterName);
        return chapterRepository.deleteItems(userId, subjectName, chapterName);
    }
}
