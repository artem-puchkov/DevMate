package com.project.devmate.controller;

import com.project.devmate.dto.AllUserPostsDto;
import com.project.devmate.dto.UserPostDto;
import com.project.devmate.service.UserPostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "UserPost endpoints")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserPostController {

    private final UserPostService userPostService;

    @Operation(summary = "Get specific user post by ID")
    @GetMapping("/getAllUserPosts")
    @ResponseStatus(HttpStatus.OK)
    public List<AllUserPostsDto> findAllUserPosts() {
        return userPostService.getAllPosts();
    }

    @Operation(summary = "Get all user posts from db")
    @GetMapping("/getUserPost/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserPostDto findUserPost(@PathVariable Long id) {
        return userPostService.getUserPost(id);
    }

    @Operation(summary = "Create new user post")
    @PostMapping("/createUserPost")
    public ResponseEntity<HttpStatus> createUserPost(@RequestBody @Valid UserPostDto userPostDto) {
        userPostService.saveUserPost(userPostDto);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @Operation(summary = "Update specific user post by ID")
    @PutMapping("/updateUserPost/{id}")
    public ResponseEntity<HttpStatus> updateUserPost(@PathVariable Long id,
                                                     @RequestBody @Valid UserPostDto updatedUserPostDto) {
        userPostService.updateUserPost(id, updatedUserPostDto);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @Operation(summary = "Delete specific user post by ID")
    @DeleteMapping("/deleteUserPost/{id}")
    public ResponseEntity<HttpStatus> deleteUserPost(@PathVariable Long id) {
        userPostService.deleteUserPost(id);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @Operation(summary = "Get all posts by specific post title")
    @GetMapping({"/getAllUserPostsWithTitle/{title}"})
    public List<AllUserPostsDto> findUserPostsByPostTitle(@PathVariable String title) {
        return userPostService.getUserPostsByPostTitle(title);
    }

    @Operation(summary = "Get all posts of a specific user")
    @GetMapping({"/getAllUserPostsByUser/{id}"})
    public List<AllUserPostsDto> findUserPostsByUser(@PathVariable Long id) {
        return this.userPostService.getUserPostsByUserId(id);
    }
}
