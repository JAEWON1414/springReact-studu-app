package com.example.mystudyapp.service;

import com.example.mystudyapp.domain.Subject;
import com.example.mystudyapp.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public boolean join(String userId, String name) {
        Optional<Subject> optionalSubject = subjectRepository.findSubject(userId, name);
        if (optionalSubject.isPresent()) {
            return false;
        }
        Subject subject = new Subject(userId, name);
        subjectRepository.save(subject);
        return true;
    }

    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

    public List<Subject> findSubjectsByUserId(String userId) {
        return subjectRepository.findSubjectsByUserId(userId);
    }

    public int delete(String userId, String subjectName) {
        subjectRepository.delete(userId, subjectName);
        subjectRepository.deleteChapters(userId, subjectName);
        return subjectRepository.deleteItems(userId, subjectName);
    }
}
