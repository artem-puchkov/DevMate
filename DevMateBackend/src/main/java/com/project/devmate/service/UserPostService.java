package com.project.devmate.service;

import com.project.devmate.dto.AllUserPostsDto;
import com.project.devmate.dto.UserPostDto;
import com.project.devmate.entity.User;
import com.project.devmate.entity.UserPost;
import com.project.devmate.repositry.UserPostRepository;
import com.project.devmate.repositry.UserRepository;
import com.project.devmate.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPostService {
    private static final String USER_POST_DOES_NOT_EXIST = "Such a user post does not exist";

    private static final String USER_DOES_NOT_FOUND = "User with id: %d not found";

    private final UserPostRepository userPostRepository;

    private final UserRepository userRepository;

    private final UserPostMapper userPostMapper;

    public List<AllUserPostsDto> getAllPosts() {
        Iterable<UserPost> userPostsIterable = userPostRepository.findAll();

        return getListOfAllUserPostDto(userPostsIterable);
    }

    public UserPostDto getUserPost(Long id) {
        UserPost userPost = userPostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_POST_DOES_NOT_EXIST));

        return userPostMapper.toDto(userPost);
    }

    public void saveUserPost(UserPostDto userPostDto) {
        User user = userRepository.findById(userPostDto.userId()).orElseThrow(() -> new ResourceNotFoundException(String.format(USER_DOES_NOT_FOUND, userPostDto.userId())));
        UserPost userPost = userPostMapper.toBusinessModel(userPostDto);

        userPost.setUser(user);

        userPostRepository.save(userPost);
    }

    public void updateUserPost(Long id, UserPostDto updatedUserPostDto) {
        UserPost existingUserPost = userPostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_POST_DOES_NOT_EXIST));
        UserPost updatedUserPost = userPostMapper.toBusinessModel(updatedUserPostDto);

        userPostRepository.save(MergeUtils.mergeUserPost(existingUserPost, updatedUserPost));
    }

    public void deleteUserPost(Long id) {
        UserPost userPost = userPostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_POST_DOES_NOT_EXIST));

        userPostRepository.delete(userPost);
    }

    public List<AllUserPostsDto> getUserPostsByPostTitle(String title) {
        List<UserPost> userPostsIterable = userPostRepository.findAllByPostTitleStartingWith(title);

        return getListOfAllUserPostDto(userPostsIterable);
    }

    public List<AllUserPostsDto> getUserPostsByUserId(Long id) {
        List<UserPost> userPostsIterable = userPostRepository.findAllUserPostsByUserId(id);

        return getListOfAllUserPostDto(userPostsIterable);
    }

    private List<AllUserPostsDto> getListOfAllUserPostDto(Iterable<UserPost> userPostIterable) {
        List<AllUserPostsDto> userPostsDto = new ArrayList<>();
        userPostIterable.forEach(userPost -> userPostsDto.add(userPostMapper.toAllUserPostDto(userPost)));

        return userPostsDto;
    }
}

