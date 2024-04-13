package com.project.devmate.service;

import com.project.devmate.dto.UserDataDto;
import com.project.devmate.dto.UserUpdateDto;
import com.project.devmate.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.Base64;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "userPosts", ignore = true)
    User toBusinessModel(UserUpdateDto userUpdateDto);

    @Mapping(target = "avatar", expression = "java(encodeAvatar(user.getAvatar()))")
    UserDataDto toDto(User user);

    default String encodeAvatar(byte[] avatar) {
        if (avatar != null && avatar.length > 0)
            return Base64.getEncoder().encodeToString(avatar);
        return null;
    }
}
