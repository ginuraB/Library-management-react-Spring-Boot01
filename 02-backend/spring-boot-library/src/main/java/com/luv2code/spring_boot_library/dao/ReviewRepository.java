package com.luv2code.spring_boot_library.dao;

import com.luv2code.spring_boot_library.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

//import java.awt.print.Pageable;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    Page<Review> findByBookId(@RequestParam("book_id")Long bookId,
                              Pageable pageable);
}
