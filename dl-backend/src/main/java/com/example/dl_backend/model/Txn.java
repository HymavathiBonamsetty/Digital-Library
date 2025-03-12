package com.example.dl_backend.model;

import com.example.dl_backend.enums.TxnStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Calendar;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Txn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int paidAmount;
    private int fine;

    @CreationTimestamp
    private Date createdOn;

    @UpdateTimestamp
    private Date updatedOn;

    @Enumerated(EnumType.STRING)
    private TxnStatus txnStatus;

    @ManyToOne
    @JoinColumn(name="book_id")
    @JsonIgnoreProperties("txn")
    private Books book;

    @ManyToOne
    @JoinColumn(name="student_id")
    @JsonIgnoreProperties("txn")
    private Student student;


}


