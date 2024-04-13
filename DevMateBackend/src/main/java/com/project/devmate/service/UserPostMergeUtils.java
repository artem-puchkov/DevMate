package com.project.devmate.service;

import com.project.devmate.entity.UserPost;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserPostMergeUtils {

    public UserPost merge(UserPost to, UserPost from) {
        to.setTitle(from.getTitle());
        to.setDescription(from.getDescription());

        return to;
    }
}
