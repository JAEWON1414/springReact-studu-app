package com.example.mystudyapp.repository;

import com.example.mystudyapp.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdAndSubjectName(String userId, String subjectName);

    @Transactional
    @Modifying
    void deleteByUserIdAndSubjectNameAndTaskName(String userId, String subjectName, String TaskName);
//    @Transactional
//    @Modifying
//    @Query("")
}
