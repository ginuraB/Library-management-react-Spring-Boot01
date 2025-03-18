package com.luv2code.spring_boot_library.dao;

import com.luv2code.spring_boot_library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.stereotype.Repository;

@RepositoryRestResource(path="books")
public interface BookRepository extends JpaRepository <Book, Long>{
    Page<Book> findByTitleContaining(@RequestParam("title") String title,  Pageable pageabale);
    Page<Book> findByCategory(@RequestParam("category") String category ,Pageable pageable);
}
