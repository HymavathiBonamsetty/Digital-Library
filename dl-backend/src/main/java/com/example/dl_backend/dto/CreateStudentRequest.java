package com.example.dl_backend.dto;

import com.example.dl_backend.model.Student;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateStudentRequest {
    private String name;
    private String email;
    private String address;

    public Student toStudent() {
        return Student.builder()
                .name(this.name)
                .email(this.email)
                .address(this.address)
                .build();
    }
}
