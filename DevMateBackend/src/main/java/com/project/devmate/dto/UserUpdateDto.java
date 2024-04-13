package com.project.devmate.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserUpdateDto(
        Long id,
        @NotBlank(message = "Имя пользователя не должно быть пустым")
        @Size(max = 30, message = "Имя пользователя не должно быть длиннее 30 символов")
        String name,
        @Size(max = 170, message = "Поле \"О себе\" не должно быть длиннее 170 символов")
        String about,
        @NotNull(message = "Поле для ввода ссылки на телеграм не должно быть пустым")
        @Pattern(regexp = "https://t.me/[A-Za-z0-9_]+", message = "Ссылка на телеграм аккаунт не является действительной")
        String telegram,
        byte[] avatar
) {
}
