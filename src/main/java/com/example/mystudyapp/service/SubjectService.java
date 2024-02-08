package com.example.mystudyapp.service;

import com.example.mystudyapp.controller.SubjectEditDTO;
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

    public boolean join(String userId, String name, Long priority) {
        Optional<Subject> optionalSubject = subjectRepository.findByNameAndUserId(name, userId);
        if (optionalSubject.isPresent()) {
            return false;
        }
        Subject subject = new Subject(userId, name, priority);
        subjectRepository.save(subject);
        return true;
    }

    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

    public List<Subject> findSubjectsByUserId(String userId) {
        return subjectRepository.findByUserId(userId);
    }

    public int delete(String userId, String subjectName) {
        subjectRepository.deleteByUserIdAndName(userId, subjectName);
        subjectRepository.deleteChapters(userId, subjectName);
        return subjectRepository.deleteItems(userId, subjectName);
    }

    public void update(SubjectEditDTO subjectEditDTO){
        subjectRepository.update(subjectEditDTO.getUserId(), subjectEditDTO.getName(), subjectEditDTO.getNewName());
    }
    public void updatePriority(Subject subject){
        System.out.println("!!!! userId = "+subject.getUserId()+" name = "+subject.getUserId()+" priority = "+subject.getPriority());
        subjectRepository.updatePriority(subject.getUserId(), subject.getName(), subject.getPriority());
    }
}
