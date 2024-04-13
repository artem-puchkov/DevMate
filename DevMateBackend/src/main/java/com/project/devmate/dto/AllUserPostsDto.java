package com.project.devmate.dto;

import java.util.List;

public record AllUserPostsDto(
    Long id,
    String title,
    List<String>techs,
    String userName,
    String avatar
) {
}
