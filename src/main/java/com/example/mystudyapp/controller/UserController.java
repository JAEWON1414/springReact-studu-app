package com.example.mystudyapp.controller;


import com.example.mystudyapp.domain.User;
import com.example.mystudyapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ResponseBody
    @PostMapping("login")
    public boolean login(@RequestBody final User user) {
        return userService.loginVerify(user.getUserId(), user.getUserPw());
    }

    //users post
    @ResponseBody
    @PostMapping("")
    public boolean create(@RequestBody final User user) {
        return userService.join(user.getUserId(), user.getUserPw());
    }


}

