package com.example.mystudyapp.repository;

import com.example.mystudyapp.domain.Chapter;
import com.example.mystudyapp.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    List<Chapter> findByUserIdAndSubjectName(String userId, String subjectName);

    @Transactional
    @Modifying
    @Query("UPDATE Chapter c SET c.checked=:checked " +
            "WHERE c.userId=:userId and c.subjectName=:subjectName and c.chapterName=:chapterName")
    int updateChecked(String userId, String subjectName, String chapterName, boolean checked);

    @Transactional
    @Modifying
    int deleteByUserIdAndSubjectNameAndChapterName(String userId, String subjectName, String chapterName);
//    @Query("DELETE Chapter c WHERE c.userId=:userId and c.subjectName=:subjectName and c.chapterName=:chapterName ")
//    int delete(String userId, String subjectName, String chapterName);

    @Transactional
    @Modifying
    @Query("DELETE Item i WHERE i.userId=:userId and i.subjectName=:subjectName and i.chapterName=:chapterName")
    int deleteItems(String userId, String subjectName, String chapterName);

    @Transactional
    @Modifying
    @Query("UPDATE Chapter c set c.chapterName=:newName WHERE c.userId=:userId and c.subjectName=:subjectName and c.chapterName=:name")
    void updateName(String userId,String subjectName, String name, String newName);
}
