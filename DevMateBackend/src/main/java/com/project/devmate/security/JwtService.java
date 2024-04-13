package com.project.devmate.security;

import com.project.devmate.util.exception.AuthException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtService {

    private static final String INVALID_TOKEN = "Invalid token";

    private static final String TOKEN_EXPIRED = "Token expired";

    private static final long SEC_TO_MILLS_MULTIPLIER = 1000L;

    private final JwtProperties props;


    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public void checkToken(String token) {
        if (isNotValidToken(token)) {
            throw new AuthException(INVALID_TOKEN);
        }

        final String username = extractUsername(token);

        if (username == null) {
            throw new AuthException(INVALID_TOKEN);
        }
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(getExpirationDate(props.getAccessExpirationInSeconds()))
                .signWith(getSignInKey(), props.getAlgorithm())
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(props.getSecretKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isNotValidToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token);
            return false;
        } catch (ExpiredJwtException ex) {
            log.warn("Expired JWT token; {}", token);
            throw new AuthException(TOKEN_EXPIRED);
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException ex) {
            log.warn("Failed read JWT token: {}, error: {}", token, ex.getMessage());
            return true;
        }
    }

    private Date getExpirationDate(long time) {
        return new Date(System.currentTimeMillis() + time * SEC_TO_MILLS_MULTIPLIER);
    }
}
