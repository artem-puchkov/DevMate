package com.project.devmate.repositry;

import com.project.devmate.entity.UserPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPostRepository extends JpaRepository<UserPost, Long> {
    @Query("SELECT up FROM UserPost up WHERE up.user.id = :userId")
    List<UserPost> findAllUserPostsByUserId(Long userId);

    @Query("SELECT a FROM UserPost a WHERE a.title LIKE :title%")
    List<UserPost> findAllByPostTitleStartingWith(@Param("title") String title);
}
