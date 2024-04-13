package com.project.devmate.service;

import com.project.devmate.dto.UserDataDto;
import com.project.devmate.dto.UserUpdateDto;
import com.project.devmate.entity.User;
import com.project.devmate.repositry.UserRepository;
import com.project.devmate.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final String USER_DOES_NOT_EXIST = "Such a user does not exist";

    private static final String USER_WITH_EMAIL_NOT_EXIST = "Such a user with this email does not exist";

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserDataDto getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_DOES_NOT_EXIST));

        return userMapper.toDto(user);
    }

    public void updateUser(UserUpdateDto userDto, Long id) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(USER_DOES_NOT_EXIST));
        User updatedUser = userMapper.toBusinessModel(userDto);

        userRepository.save(MergeUtils.mergeUser(existingUser, updatedUser));
    }

    public UserDataDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException(USER_WITH_EMAIL_NOT_EXIST));

        return userMapper.toDto(user);
    }
}
