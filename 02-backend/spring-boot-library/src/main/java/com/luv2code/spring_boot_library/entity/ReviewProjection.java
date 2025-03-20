package com.luv2code.spring_boot_library.entity;

import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "reviewProjection", types = { Review.class })
public interface ReviewProjection {
    Long getId();
    String getUserEmail();
    Date getDate();
    double getRating();
    Long getBookId();
    String getReviewDescription();
}
