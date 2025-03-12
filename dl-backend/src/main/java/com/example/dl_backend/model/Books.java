package com.example.dl_backend.model;

import com.example.dl_backend.enums.BookType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Books{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String bookName;
    private String bookNo;

    @Enumerated(value = EnumType.STRING)
    private BookType bookType;

    private int pages;
    private int cost;

    @ManyToOne
    @JoinColumn(name="author_id")
    @JsonIgnoreProperties({"bookList"})
    private Author author;

    @ManyToOne
    @JoinColumn(name="student_id")
    @JsonIgnoreProperties({"book"})
    private Student student;

    @OneToMany(mappedBy = "book")
    @JsonIgnoreProperties({"book"})
    private List<Txn> txn;

}
