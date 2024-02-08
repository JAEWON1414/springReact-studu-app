package com.example.mystudyapp.repository;

import com.example.mystudyapp.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findByNameAndUserId(String name, String userId);

    List<Subject> findByUserId(String userId);

    @Transactional
    @Modifying
    int deleteByUserIdAndName(String userId, String name);

    @Transactional
    @Modifying
    @Query("DELETE Chapter c WHERE c.userId=:userId and c.subjectName=:subjectName")
    int deleteChapters(String userId, String subjectName);

    @Transactional
    @Modifying
    @Query("DELETE Item i WHERE i.userId=:userId and i.subjectName=:subjectName")
    int deleteItems(String userId, String subjectName);

    @Transactional
    @Modifying
    @Query("UPDATE Subject s set s.name=:newName WHERE s.userId=:userId and s.name=:name")
    void update(String userId, String name, String newName);

    @Transactional
    @Modifying
    @Query("UPDATE Subject s set s.priority=:priority WHERE s.userId=:userId and s.name=:name")
    void updatePriority(String userId, String name, Long priority);
}
