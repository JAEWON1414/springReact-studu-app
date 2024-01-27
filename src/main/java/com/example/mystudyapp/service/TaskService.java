package com.example.mystudyapp.service;

//import com.example.mystudyapp.controller.TaskDTO;
import com.example.mystudyapp.domain.Task;
import com.example.mystudyapp.repository.ChapterRepository;
import com.example.mystudyapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository){this.taskRepository=taskRepository;}

    public void join(Task task){
        Task newTask = new Task(task.getUserId(), task.getSubjectName(), task.getTaskName(),task.getYear(), task.getMonth(), task.getDay());
        taskRepository.save(newTask);
    }
    public List<Task> findByUserIdAndSubjectName(String userId, String subjectName){
        return taskRepository.findByUserIdAndSubjectName(userId, subjectName);
    }
    public void delete(Task task){
        taskRepository.deleteByUserIdAndSubjectNameAndTaskName(task.getUserId(), task.getSubjectName(), task.getTaskName());
    }
}
