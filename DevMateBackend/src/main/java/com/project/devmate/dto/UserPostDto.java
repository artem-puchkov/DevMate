package com.project.devmate.dto;

import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;

@Builder
public record UserPostDto(
        Long id,
        @Size(min = 5, max = 120, message = "Название анкеты должно быть длинной от 5 до 150 символов")
        String title,
        @Size(min = 20, message = "Содержание анкеты должно быть длинной хотя бы 20 символов")
        String description,
        List<String> techs,
        String linkedIn,
        String instagram,
        String vk,
        String gitHub,
        String x,
        Long userId
) {
}
