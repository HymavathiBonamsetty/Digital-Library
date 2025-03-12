package com.example.dl_backend.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CreateTxnRequest {
    private String studentEmail;
    private String bookNo;
    private int paidAmount;
}
