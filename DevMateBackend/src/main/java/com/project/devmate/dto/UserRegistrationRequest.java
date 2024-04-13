package com.project.devmate.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UserRegistrationRequest(
        @NotBlank(message = "Имя пользователя не должно быть пустым")
        @Size(max = 30, message = "Имя пользователя не должно быть длиннее 30 символов")
        String name,
        @NotNull(message = "Поле электронной почты не должно быть пустым")
        @Pattern(regexp = "^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$",
                 message = "Поле электронной почты должно иметь вид: user@domain.com")
        String email,
        @NotNull(message = "Поле для ввода ссылки на телеграм не должно быть пустым")
        @Pattern(regexp = "https://t.me/[A-Za-z0-9_]+", message = "Ссылка на телеграм аккаунт не является действительной")
        String telegram,
        byte[] avatar,
        @NotNull(message = "Пароль не должен быть пустым")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$",
                message = "Пароль должен состоять не менее чем из 8 символов и содержать как минимум"
                        + " одну латинскую букву и одну цифру")
        String password
        ) {
}
