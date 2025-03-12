package com.example.dl_backend.service;

import com.example.dl_backend.dto.CreateBookRequest;
import com.example.dl_backend.enums.BookType;
import com.example.dl_backend.enums.FilterBookBy;
import com.example.dl_backend.enums.Operator;
import com.example.dl_backend.model.Author;
import com.example.dl_backend.model.Books;
import com.example.dl_backend.repository.AuthorRepository;
import com.example.dl_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    public Books createBook(CreateBookRequest createBookRequest) {
        Author author = authorRepository.findByEmail(createBookRequest.getAuthorEmail());

        if (author == null) {
            author = createBookRequest.toAuthor();
            author = authorRepository.save(author);
        }

        Books book = createBookRequest.toBook();
        book.setAuthor(author);
        return bookRepository.save(book);
    }


    public Books getBook(int id) {
        return bookRepository.findById(id).orElse(null);
    }

    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }


    public Books updateBook(int id, CreateBookRequest createBookRequest) {
        Books book = getBook(id);
        book.setBookName(createBookRequest.getBookName());
        book.setPages(createBookRequest.getPages());
        book.setCost(createBookRequest.getCost());
//      book.setProducer(createBookRequest.getProducer());
        book.setBookNo(createBookRequest.getBookNo());
        book.setBookType(BookType.valueOf(createBookRequest.getBookType()));
        return bookRepository.save(book);
    }

    public List<Books> getBookFilter(Operator operator, FilterBookBy filterBookBy, String value) {
        switch (operator){
            case EQUALS :
                switch (filterBookBy){
                    case BOOK_NAME :
                        return bookRepository.findByBookName(value);
                    case BOOK_NO :
                        return bookRepository.findByBookNo(value);
                    case BOOK_TYPE :
                        return bookRepository.findByBookType(value);
                    case PAGES :
                        return bookRepository.findByPages(Integer.parseInt(value));
                    case COST :
                        return bookRepository.findByCost(Integer.parseInt(value));
                }

            case GREATER_THAN:
                switch (filterBookBy){
                    case PAGES :
                        return bookRepository.findByPagesGreaterThan(Integer.parseInt(value));
                    case COST :
                        return bookRepository.findByCostGreaterThan(Integer.parseInt(value));
                }
            case LESS_THAN:
                switch (filterBookBy){
                    case PAGES :
                        return bookRepository.findByPagesLessThan(Integer.parseInt(value));
                    case COST :
                        return bookRepository.findByCostLessThan(Integer.parseInt(value));
                }
            default:
                return new ArrayList<>();
        }
    }

    public void deleteBook(int id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
        } else {
            throw new RuntimeException("Book not found with ID: " + id);
        }
    }



    public void saveUpdateBook(Books bookFromDb) {
        bookRepository.save(bookFromDb);
    }
}
