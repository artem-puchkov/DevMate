package com.project.devmate.util;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestConstructor;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Testcontainers
@ActiveProfiles("test")
@SpringBootTest
@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
public @interface DevmateIntegrationTest {
}
