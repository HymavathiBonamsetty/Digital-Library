package com.example.dl_backend.controller;

import com.example.dl_backend.dto.CreateTxnRequest;
import com.example.dl_backend.dto.ReturnTxnRequest;
import com.example.dl_backend.model.Txn;
import com.example.dl_backend.service.TxnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/txn")
@CrossOrigin(origins = {"https://digital-library-1-wd96.onrender.com", "http://localhost:3000"})
public class TxnController {

    @Autowired
    private TxnService txnService;

    @PostMapping("/create")
    public int createTxn(@RequestBody CreateTxnRequest createTxnRequest) throws Exception {
        return txnService.createTxn(createTxnRequest);
    }

    @PostMapping("/return")
    public ResponseEntity<String> returnBook(@RequestBody ReturnTxnRequest returnTxnRequest) throws Exception {
        return ResponseEntity.ok(txnService.returnBook(returnTxnRequest));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Txn>> getAllTransactions() {
        return ResponseEntity.ok(txnService.getAllTransactions());
    }


//    @PostMapping("/update")
//    public String updateTxn(@RequestBody CreateTxnResponse createTxnResponse) throws Exception {
//        return txnService.updateTxn(createTxnResponse);
//    }


}


