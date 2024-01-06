package com.example.mystudyapp.service;

import com.example.mystudyapp.domain.User;
import com.example.mystudyapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean join(String userId, String userPw) {
        Optional<User> optionalUser = userRepository.findUserByUserId(userId);
        if (optionalUser.isPresent()) {
            return false;
        }
        User user = new User(userId, userPw);
        userRepository.save(user);
        return true;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public boolean loginVerify(String userId, String userPw) {
        Optional<User> optionalUser = userRepository.findUserByUserId(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getUserPw().equals(userPw);
        }
        return false;
    }
}
