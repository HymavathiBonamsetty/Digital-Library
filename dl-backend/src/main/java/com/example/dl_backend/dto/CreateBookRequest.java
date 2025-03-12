package com.example.dl_backend.dto;

import com.example.dl_backend.enums.BookType;
import com.example.dl_backend.model.Author;
import com.example.dl_backend.model.Books;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateBookRequest {
    private String bookName;
    private String bookNo;
    private String bookType;
    private int pages;
    private int cost;
    private String authorName;
    private String authorEmail;

    public Books toBook() {
        return Books.builder()
                .bookName(bookName)
                .bookNo(bookNo)
                .bookType(BookType.valueOf(bookType))
                .pages(pages)
                .cost(cost)
                .build();
    }

    public Author toAuthor() {
        return Author.builder()
                .authorName(authorName)
                .email(authorEmail)
                .build();
    }



}



