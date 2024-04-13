package com.project.devmate.service;

import com.project.devmate.dto.AllUserPostsDto;
import com.project.devmate.dto.UserPostDto;
import com.project.devmate.entity.UserPost;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Base64;

@Mapper(componentModel = "spring")
public interface UserPostMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    @Mapping(target = "updatingDate", ignore = true)
    @Mapping(target = "user", ignore = true)
    UserPost toBusinessModel(UserPostDto userPostDto);

    @Mapping(target = "userId", expression = "java(userPost.getUser().getId())")
    UserPostDto toDto(UserPost userPost);

    @Mapping(target = "userName", expression = "java(userPost.getUser().getName())")
    @Mapping(target = "avatar", expression = "java(encodeAvatar(userPost.getUser().getAvatar()))")
    AllUserPostsDto toAllUserPostDto(UserPost userPost);

    default String encodeAvatar(byte[] avatar) {
        if (avatar != null && avatar.length > 0)
            return Base64.getEncoder().encodeToString(avatar);
        return null;
    }
}
