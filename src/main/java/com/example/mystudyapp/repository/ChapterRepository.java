package com.example.mystudyapp.repository;

import com.example.mystudyapp.domain.Chapter;
import com.example.mystudyapp.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    //    @Query("SELECT c FROM Chapter c WHERE c.userId= :userId and c.subjectName=:subjectName")
//    List<Chapter> findChaptersByUserId(String userId, String subjectName);
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

}
