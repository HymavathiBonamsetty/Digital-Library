package com.example.dl_backend.repository;

import com.example.dl_backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findByName(String value);
    List<Student> findByEmail(String value);
}
