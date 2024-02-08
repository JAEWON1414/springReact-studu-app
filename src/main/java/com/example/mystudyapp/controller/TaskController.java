package com.example.mystudyapp.controller;

import com.example.mystudyapp.domain.Task;
import com.example.mystudyapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){this.taskService = taskService;}

    @ResponseBody
    @PostMapping("create")
    public boolean create(@RequestBody final Task task){
        taskService.join(task);
        return true;
    }

    @ResponseBody
    @PostMapping("")
    public List<Task> read(@RequestBody final Task task){
        return taskService.findByUserIdAndSubjectName(task.getUserId(), task.getSubjectName());
    }
    @ResponseBody
    @PostMapping("delete")
    public boolean delete(@RequestBody final Task task){
        taskService.delete(task);
        return true;
    }
    @ResponseBody
    @PostMapping("update")
    public boolean update(@RequestBody final TaskEditDTO taskEditDTO){
        taskService.updateName(taskEditDTO);
        return true;
    }
    @ResponseBody
    @PostMapping("updateCheck")
    public boolean update(@RequestBody final Task task){
        taskService.updateCheck(task);
        return true;
    }
}
