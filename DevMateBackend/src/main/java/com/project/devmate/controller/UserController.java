package com.project.devmate.controller;

import com.project.devmate.dto.UserDataDto;
import com.project.devmate.dto.UserUpdateDto;
import com.project.devmate.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/v1/user"})
@CrossOrigin(origins = {"http://localhost:5173"})
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping({"/getUser/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public UserDataDto findUser(@PathVariable Long id) {
        return this.userService.getUser(id);
    }

    @PostMapping({"/updateUser/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(@RequestBody @Valid UserUpdateDto userDto, @PathVariable Long id) {
        this.userService.updateUser(userDto, id);
    }

    @GetMapping({"/getUserByEmail/{email}"})
    @ResponseStatus(HttpStatus.OK)
    public UserDataDto findUserByEmail(@PathVariable String email) {
        return this.userService.getUserByEmail(email);
    }
}
