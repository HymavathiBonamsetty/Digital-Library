package com.example.dl_backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReturnTxnRequest {
    private String studentEmail;
    private String bookNo;
    private int txnId;
}
