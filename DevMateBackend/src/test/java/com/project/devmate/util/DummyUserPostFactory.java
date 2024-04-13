package com.project.devmate.util;

import com.project.devmate.dto.UserPostDto;

public class DummyUserPostFactory {

    private static final String VALID_TITLE = "Ищу человека, разбирающегося во фронтенде";
    private static final String VALID_DESCRIPTION = "Ищу человека, знающего React или любой другой фронтенд фреймоврк.";
    private static final String LOW_NUMBER_OF_CHARACTERS_DESCRIPTION = "Занимаюсь Java год";
    private static final String LARGE_NUMBER_OF_CHARACTERS_TITLE = "Ищу начинающего, как и я, бэкенд разработчика, который" +
            " сможет написать серверную часть к приложению. Ваш язык может быть любой, мой стек: TypeScript, React, MUI";

    public static UserPostDto getValidUserPostDto() {
        return UserPostDto.builder()
                .title(VALID_TITLE)
                .description(VALID_DESCRIPTION)
                .userId(1L)
                .build();
    }

    public static UserPostDto getUserDtoWithLowNumberOfCharactersInDesc() {
        return UserPostDto.builder()
                .title(VALID_TITLE)
                .description(LOW_NUMBER_OF_CHARACTERS_DESCRIPTION)
                .userId(2L)
                .build();
    }

    public static UserPostDto getUserPostDtoWithLargeNumberOfCharactersInTitle() {
        return UserPostDto.builder()
                .title(LARGE_NUMBER_OF_CHARACTERS_TITLE)
                .description(VALID_DESCRIPTION)
                .userId(1L)
                .build();
    }
}