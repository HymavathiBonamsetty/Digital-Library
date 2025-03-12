package com.example.dl_backend.repository;

import com.example.dl_backend.model.Books;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BookRepository extends JpaRepository<Books, Integer> {


    List<Books> findByBookName(String value);

    List<Books> findByBookNo(String value);

    List<Books> findByBookType( String value);

    List<Books> findByPages(int i);

    List<Books> findByCost(int i);


    List<Books> findByPagesLessThan(int i);

    List<Books> findByCostLessThan(int i);


    List<Books> findByPagesGreaterThan(int i);

    List<Books> findByCostGreaterThan(int i);
}

