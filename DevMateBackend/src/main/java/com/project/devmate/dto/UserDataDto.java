package com.project.devmate.dto;

public record UserDataDto(
    Long id,
    String name,
    String email,
    String about,
    String telegram,
    String avatar
) {
}
