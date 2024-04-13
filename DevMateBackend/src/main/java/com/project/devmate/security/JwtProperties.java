package com.project.devmate.security;

import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Getter
public class JwtProperties {

    @Value("${jwt.alg}")
    private SignatureAlgorithm algorithm;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long accessExpirationInSeconds;

}
