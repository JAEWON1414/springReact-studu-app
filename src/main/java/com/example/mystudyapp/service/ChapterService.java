package com.example.mystudyapp.service;


import com.example.mystudyapp.controller.ChapterEditDTO;
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

    public boolean join(String userId, String subjectName, String chapterName, Integer chapterPercent) {
        Chapter chapter = new Chapter(userId, subjectName, chapterName, chapterPercent);
        chapterRepository.save(chapter);
        return true;
    }

    public List<Chapter> findChaptersByUserId(String userId, String subjectName) {
        return chapterRepository.findByUserIdAndSubjectName(userId, subjectName);
    }

    public int updateChecked(String userId, String subjectName, String chapterName, Integer chapterPercent) {
        return chapterRepository.updateChecked(userId, subjectName, chapterName, chapterPercent);
    }

    public int delete(String userId, String subjectName, String chapterName) {
        chapterRepository.deleteByUserIdAndSubjectNameAndChapterName(userId, subjectName, chapterName);
        return chapterRepository.deleteItems(userId, subjectName, chapterName);
    }

    public void updateName(ChapterEditDTO chapterEditDTO){
        chapterRepository.updateName(chapterEditDTO.getUserId(),chapterEditDTO.getSubjectName(),chapterEditDTO.getName(),chapterEditDTO.getNewName());
    }
}
