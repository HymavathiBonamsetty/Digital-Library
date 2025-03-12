package com.example.dl_backend.repository;

import com.example.dl_backend.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author,Integer> {
    Author findByEmail(String authorEmail);
}
