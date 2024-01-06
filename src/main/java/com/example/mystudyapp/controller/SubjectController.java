package com.example.mystudyapp.controller;


import com.example.mystudyapp.domain.Subject;
import com.example.mystudyapp.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @ResponseBody
    @PostMapping("create")
    public boolean create(@RequestBody final Subject subject) {
        return subjectService.join(subject.getUserId(), subject.getName());
    }

    @ResponseBody
    @PostMapping("")
    public List<Subject> read(@RequestBody final String userId) {
        return subjectService.findSubjectsByUserId(userId);
    }


    @ResponseBody
    @PostMapping("delete")
    public int delete(@RequestBody final Subject subject) {
        System.out.println("delete subject = " + subject.getUserId() + " " + subject.getName());
        return subjectService.delete(subject.getUserId(), subject.getName());
    }

}
