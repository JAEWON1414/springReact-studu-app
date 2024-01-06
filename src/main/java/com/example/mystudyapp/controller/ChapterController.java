package com.example.mystudyapp.controller;


import com.example.mystudyapp.domain.Chapter;
import com.example.mystudyapp.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/chapters")
public class ChapterController {
    private final ChapterService chapterService;

    @Autowired
    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @ResponseBody
    @PostMapping("create")
    public boolean create(@RequestBody final Chapter chapter) {
        return chapterService.join(chapter.getUserId(), chapter.getSubjectName(), chapter.getChapterName());
    }

    @ResponseBody
    @PostMapping("updateCheck")
    public int update(@RequestBody final Chapter chapter) {
        return chapterService.updateChecked(chapter.getUserId(), chapter.getSubjectName(), chapter.getChapterName(), chapter.isChecked());
    }

    @ResponseBody
    @PostMapping("")
    public List<Chapter> read(@RequestBody final Chapter chapter) {
        List<Chapter> list = chapterService.findChaptersByUserId(chapter.getUserId(), chapter.getSubjectName());
        return list;
    }

    @ResponseBody
    @PostMapping("delete")
    public int delete(@RequestBody final Chapter chapter) {
        System.out.println("delete chapter = " + chapter.getUserId() + " " + chapter.getSubjectName() + " " + chapter.getChapterName());
        return chapterService.delete(chapter.getUserId(), chapter.getSubjectName(), chapter.getChapterName());
    }
}
