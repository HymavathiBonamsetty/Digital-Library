package com.example.dl_backend.service;

import com.example.dl_backend.dto.CreateStudentRequest;
import com.example.dl_backend.enums.FilterStudentBy;
import com.example.dl_backend.enums.Operator;
import com.example.dl_backend.model.Student;
import com.example.dl_backend.repository.StudentRepository;
import com.example.dl_backend.repository.TxnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    private TxnRepository txnRepository;



    public Student createStudent(CreateStudentRequest createStudentRequest) {
        return studentRepository.save(createStudentRequest.toStudent());
    }

    public Student getStudent(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    public Student updateStudent(int id, CreateStudentRequest createStudentRequest) {
        Student student= getStudent(id);
//        Student student= studentRepository.findById(id).get();
        student.setName(createStudentRequest.getName());
        student.setEmail(createStudentRequest.getEmail());
        student.setAddress(createStudentRequest.getAddress());
        return studentRepository.save(student);
    }

    public List<Student> getStudentFilter(Operator operator, FilterStudentBy filterStudentBy, String value) {
        switch (operator) {
            case EQUALS:
                switch (filterStudentBy) {
                    case NAME:
                        return studentRepository.findByName(value);
                    case EMAIL:
                        return studentRepository.findByEmail(value);
                }
            default:
                return new ArrayList<>();
        }
    }

    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }



}

