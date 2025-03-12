package com.example.dl_backend.controller;

import com.example.dl_backend.dto.CreateStudentRequest;
import com.example.dl_backend.enums.FilterStudentBy;
import com.example.dl_backend.enums.Operator;
import com.example.dl_backend.model.Student;
import com.example.dl_backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public ResponseEntity<Student> createStudent(@RequestBody CreateStudentRequest createStudentRequest) {
        return ResponseEntity.ok(studentService.createStudent(createStudentRequest));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id) {
        return ResponseEntity.ok(studentService.getStudent(id));
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAllStudent() {
        return ResponseEntity.ok(studentService.getAllStudent());
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody CreateStudentRequest createStudentRequest) {
        return ResponseEntity.ok(studentService.updateStudent(id, createStudentRequest));
    }

    @GetMapping("/filter/{operator}/{filterStudentBy}/{value}")
    public ResponseEntity<List<Student>> getStudentFilter(@PathVariable Operator operator, @PathVariable FilterStudentBy filterStudentBy, @PathVariable String value) {
        return ResponseEntity.ok(studentService.getStudentFilter(operator, filterStudentBy, value));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully.");
    }




}

