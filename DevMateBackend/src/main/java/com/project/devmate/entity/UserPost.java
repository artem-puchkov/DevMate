package com.project.devmate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "user_posts")
@EntityListeners(AuditingEntityListener.class)
public class UserPost {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_title")
    private String title;

    @Column(name = "post_description")
    private String description;

    @Column(name = "post_techs")
    private List<String> techs;

    @Column(name = "linked_in")
    private String linkedIn;

    @Column(name = "instagram")
    private String instagram;

    @Column(name = "vk")
    private String vk;

    @Column(name = "git_hub")
    private String gitHub;

    @Column(name = "x")
    private String x;

    @CreatedDate
    @Column(name = "post_creation_date")
    private Date creationDate;

    @LastModifiedDate
    @Column(name = "post_updating_date")
    private Date updatingDate;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
