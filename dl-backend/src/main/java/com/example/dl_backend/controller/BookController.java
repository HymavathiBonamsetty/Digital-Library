package com.example.dl_backend.controller;

import com.example.dl_backend.dto.CreateBookRequest;
import com.example.dl_backend.enums.FilterBookBy;
import com.example.dl_backend.enums.Operator;
import com.example.dl_backend.model.Books;
import com.example.dl_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")

public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping("/create")
    public ResponseEntity<Books> createBook(@RequestBody CreateBookRequest createBookRequest) {
        return ResponseEntity.ok(bookService.createBook(createBookRequest));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Books> getBook(@PathVariable int id) {
        return ResponseEntity.ok(bookService.getBook(id));
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<Books>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable int id, @RequestBody CreateBookRequest createBookRequest) {
        return ResponseEntity.ok(bookService.updateBook(id, createBookRequest));
    }

    @GetMapping("/bookFilter/{operator}/{filterBookBy}/{value}")
    public ResponseEntity<List<Books>> getBookFilter(@PathVariable Operator operator, @PathVariable FilterBookBy filterBookBy, @PathVariable String value) {
        return ResponseEntity.ok(bookService.getBookFilter(operator, filterBookBy, value));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable int id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok("Book deleted successfully!");
    }
}

