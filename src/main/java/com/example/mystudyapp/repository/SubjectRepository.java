package com.example.mystudyapp.repository;

import com.example.mystudyapp.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("SELECT s FROM Subject s WHERE s.userId= :userId and s.name =:name")
    Optional<Subject> findSubject(String userId, String name);

    @Query("SELECT s FROM Subject s WHERE s.userId= :userId")
    List<Subject> findSubjectsByUserId(String userId);

    @Transactional
    @Modifying
    @Query("DELETE Subject s WHERE s.userId=:userId and s.name=:subjectName")
    int delete(String userId, String subjectName);

    @Transactional
    @Modifying
    @Query("DELETE Chapter c WHERE c.userId=:userId and c.subjectName=:subjectName")
    int deleteChapters(String userId, String subjectName);

    @Transactional
    @Modifying
    @Query("DELETE Item i WHERE i.userId=:userId and i.subjectName=:subjectName")
    int deleteItems(String userId, String subjectName);
}
