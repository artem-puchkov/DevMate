package com.project.devmate.service;

import com.project.devmate.dto.UserPostDto;
import com.project.devmate.util.DevmateIntegrationTest;
import com.project.devmate.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.utility.DockerImageName;

import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static com.project.devmate.util.DummyUserPostFactory.getValidUserPostDto;
import static com.project.devmate.util.DummyUserPostFactory.getUserPostDtoWithLargeNumberOfCharactersInTitle;
import static org.assertj.core.api.Assertions.assertThat;

@DevmateIntegrationTest
@RequiredArgsConstructor
public class UserPostServiceIntegrationTest {

    @Container
    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(DockerImageName.parse("postgres:latest"));

    private static final String USER_POST_TITLE_ID_2 = "В поисках талантливого devOps инженера";
    private static final Long EXISTING_USER_POST_ID_2 = 2L;
    private static final Long EXISTING_USER_POST_ID_1 = 1L;
    private static final Long NON_EXISTING_USER_POST_ID = 99L;
    private static final Long NEXT_FREE_ID_IN_TABLE = 3L;

    private final UserPostService userPostService;

    @DynamicPropertySource
    private static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void whenGetUserPostFound() {
        UserPostDto userPostDto = userPostService.getUserPost(EXISTING_USER_POST_ID_2);

        assertThat(userPostDto).isNotNull();
        assertThat(userPostDto.title()).isEqualTo(USER_POST_TITLE_ID_2);
    }

    @Test
    void whenGetUserPostNotFound() {
        Throwable throwable = catchThrowable(() -> userPostService.getUserPost(
                NON_EXISTING_USER_POST_ID));

        assertThat(throwable).isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Such a user post does not exist");
    }

    @Test
    void whenCreateUserPostSuccess() {
        final UserPostDto userPostDto = getValidUserPostDto();
        userPostService.saveUserPost(userPostDto);

        final UserPostDto createdUserPostDto = userPostService.getUserPost(NEXT_FREE_ID_IN_TABLE);

        assertThat(createdUserPostDto).isNotNull();
        assertThat(createdUserPostDto.title()).isEqualTo(getValidUserPostDto().title());
        assertThat(createdUserPostDto.description()).isEqualTo(getValidUserPostDto().description());
    }

    @Test
    void whenCreateUserPostNotValid() {
        final UserPostDto userPostDto = getUserPostDtoWithLargeNumberOfCharactersInTitle();

        Throwable throwable = catchThrowable(() -> userPostService.saveUserPost(
                userPostDto));

        assertThat(throwable).isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void whenUpdateUserPostSuccess() {
        final UserPostDto userPostDto = getValidUserPostDto();
        userPostService.updateUserPost(EXISTING_USER_POST_ID_1, userPostDto);

        final UserPostDto updatedUserPostDto = userPostService.getUserPost(EXISTING_USER_POST_ID_1);

        assertThat(updatedUserPostDto).isNotNull();
        assertThat(updatedUserPostDto.title()).isEqualTo(getValidUserPostDto().title());
        assertThat(updatedUserPostDto.description()).isEqualTo(getValidUserPostDto().description());
    }

    @Test
    void whenUpdateUserPostNotFound() {
        final UserPostDto userPostDto = getValidUserPostDto();

        Throwable throwable = catchThrowable(() -> userPostService.updateUserPost(
                NON_EXISTING_USER_POST_ID, userPostDto));

        assertThat(throwable).isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Such a user post does not exist");
    }
}
