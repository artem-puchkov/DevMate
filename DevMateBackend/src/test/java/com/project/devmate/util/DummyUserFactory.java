package com.project.devmate.util;

import com.project.devmate.dto.UserAuthenticationRequest;
import com.project.devmate.dto.UserRegistrationRequest;

public class DummyUserFactory {

    private static final String EXISTING_USER_ID_1_EMAIL = "igor23aa@gmail.com";
    private static final String EXISTING_USER_ID_1_PASSWORD = "123456a12";
    private static final String INCORRECT_PASSWORD = "7711MyCat32";
    private static final String VALID_USERNAME = "Alex181";
    private static final String VALID_EMAIL = "alex.mac@gmail.com";
    private static final String VALID_PASSWORD = "alexb23231997";
    private static final String VALID_TELEGRAM = "https://t.me/LaoMaoy";
    private static final String ALREADY_EXISTING_EMAIL = "robert113@gmail.com";

    public static UserAuthenticationRequest getAuthRequestWithExistingUserCredId1() {
        return UserAuthenticationRequest.builder()
                .email(EXISTING_USER_ID_1_EMAIL)
                .password(EXISTING_USER_ID_1_PASSWORD)
                .build();
    }

    public static UserAuthenticationRequest getAuthRequestWithIncorrectPasswordId1() {
        return UserAuthenticationRequest.builder()
                .email(EXISTING_USER_ID_1_EMAIL)
                .password(INCORRECT_PASSWORD)
                .build();
    }

    public static UserRegistrationRequest getRegistrationRequestWithValidUser() {
        return UserRegistrationRequest.builder()
                .name(VALID_USERNAME)
                .email(VALID_EMAIL)
                .telegram(VALID_TELEGRAM)
                .password(VALID_PASSWORD)
                .build();
    }

    public static UserRegistrationRequest getRegistrationRequestWithAlreadyExistingEmail() {
        return UserRegistrationRequest.builder()
                .name(VALID_USERNAME)
                .email(ALREADY_EXISTING_EMAIL)
                .telegram(VALID_TELEGRAM)
                .password(VALID_PASSWORD)
                .build();
    }
}
