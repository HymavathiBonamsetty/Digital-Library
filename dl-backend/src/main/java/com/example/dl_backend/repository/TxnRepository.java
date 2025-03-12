package com.example.dl_backend.repository;

import com.example.dl_backend.model.Txn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TxnRepository extends JpaRepository<Txn, Integer> {

}