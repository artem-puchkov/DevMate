package com.project.devmate.service;

import com.project.devmate.entity.User;
import com.project.devmate.entity.UserPost;
import lombok.experimental.UtilityClass;

@UtilityClass
public class MergeUtils {

    public static UserPost mergeUserPost(UserPost to, UserPost from) {
        to.setTitle(from.getTitle());
        to.setDescription(from.getDescription());
        to.setTechs(from.getTechs());
        to.setLinkedIn(from.getLinkedIn());
        to.setInstagram(from.getInstagram());
        to.setVk(from.getVk());
        to.setGitHub(from.getGitHub());
        to.setX(from.getX());
        return to;
    }

    public static User mergeUser(User to, User from) {
        to.setName(from.getName());
        to.setTelegram(from.getTelegram());
        to.setAbout(from.getAbout());
        to.setAvatar(from.getAvatar());
        return to;
    }
}
