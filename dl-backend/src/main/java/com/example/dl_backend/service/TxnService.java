package com.example.dl_backend.service;

import com.example.dl_backend.dto.CreateTxnRequest;
import com.example.dl_backend.dto.ReturnTxnRequest;
import com.example.dl_backend.enums.FilterBookBy;
import com.example.dl_backend.enums.FilterStudentBy;
import com.example.dl_backend.enums.Operator;
import com.example.dl_backend.enums.TxnStatus;
import com.example.dl_backend.model.Books;
import com.example.dl_backend.model.Student;
import com.example.dl_backend.model.Txn;
import com.example.dl_backend.repository.TxnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TxnService {

    @Autowired
    private StudentService studentService;

    @Autowired
    private BookService bookService;

    @Autowired
    private TxnRepository txnRepository;



    public int createTxn(CreateTxnRequest createTxnRequest) throws Exception {
        List<Student> students = studentService.getStudentFilter(Operator.EQUALS, FilterStudentBy.EMAIL,createTxnRequest.getStudentEmail());

        if(students.isEmpty()) {
            throw new  Exception("Student not found");
        }
        Student studentFromDb = students.get(0);

        List<Books>  books = bookService.getBookFilter(Operator.EQUALS, FilterBookBy.BOOK_NO,createTxnRequest.getBookNo());

        if(books.isEmpty()) {
            throw new  Exception("Book not found");
        }

        Books bookFromDb = books.get(0);

        if(bookFromDb.getStudent() != null) {
            throw new Exception("Book is already issued");
        }

        Txn txn = Txn.builder()
                .student(studentFromDb)
                .book(bookFromDb)
                .paidAmount(createTxnRequest.getPaidAmount())
                .txnStatus(TxnStatus.ISSUED)
                .build();
        txn = txnRepository.save(txn);

        bookFromDb.setStudent(studentFromDb);
        bookService.saveUpdateBook(bookFromDb);
        return txn.getId();

    }

    public List<Txn> getAllTransactions() {
        return txnRepository.findAll();
    }


    public String returnBook(ReturnTxnRequest returnTxnRequest) throws Exception {
        List<Student> students = studentService.getStudentFilter(Operator.EQUALS, FilterStudentBy.EMAIL,returnTxnRequest.getStudentEmail());
        Student studentFromDb= students.get(0);
        if(studentFromDb==null) {
            throw new  Exception("Student not found");
        }

        List<Books>  books = bookService.getBookFilter(Operator.EQUALS, FilterBookBy.BOOK_NO,returnTxnRequest.getBookNo());
        Books bookFromDb = books.get(0);
        if(bookFromDb==null) {
            throw new  Exception("Book not found");
        }



        Txn txn = txnRepository.findById(returnTxnRequest.getTxnId()).get();
        if(txn.getTxnStatus()==TxnStatus.ISSUED){
            txn.setTxnStatus(TxnStatus.RETURNED);
        }

        long issuedTime = txn.getCreatedOn().getTime();
        long returnTime = System.currentTimeMillis();
        long diff = returnTime-issuedTime;

        long days = diff/(24*60*60*1000); //Total No. of days

        if(days>30){
            long duedays = days-30;
            int fine = (int)(duedays*10);

            txn.setFine(fine);
            txn.setPaidAmount(txn.getPaidAmount()-fine);
        }

        txnRepository.save(txn);

        bookFromDb.setStudent(null);
        bookService.saveUpdateBook(bookFromDb);

        return "Book returned successfully";

    }
//
//
//
//    public String updateTxn(CreateTxnResponse createTxnResponse) {
//        List<Book> books = bookService.getBookFilter(Operator.EQUALS, FilterBookBy.BOOK_NO,createTxnResponse.getBookNo());
//        Book bookFromDb = books.get(0);
//
//        List<Student> students = studentService.getStudentFilter(Operator.EQUALS, FilterStudentBy.EMAIL,createTxnResponse.getEmail());
//        Student studentFromDb = students.get(0);
//
//        if(bookFromDb.getStudent() !=null && bookFromDb.getStudent().equals(studentFromDb)) {
//            Txn txn = txnRepository.findById(createTxnResponse.getTxnId()).get();
//
//            if(txn.getTxnStatus() == TxnStatus.ISSUED) {
//                txn.setTxnStatus(TxnStatus.RETURNED);
//
//                long issuedTime = txn.getCreatedOn().getTime();
//                long currentTime = System.currentTimeMillis();
//                long daysElapsed = (currentTime - issuedTime) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
//
//                if (daysElapsed > 30) {
//                    long overdueDays = daysElapsed - 30; // Calculate overdue days
//                    long fine = overdueDays; // 1 Rupee fine per overdue day
//
//                    // Deduct the fine from the paid amount
//                    txn.setPaidAmount((int) (txn.getPaidAmount() - fine));
//                    txn.setFine(fine);
//                }
//
//
//
//                txnRepository.save(txn);
//                bookFromDb.setStudent(null);
//                bookService.saveUpdateBook(bookFromDb);
//                return "Book returned successfully";
//            }
//        }
//        return "Book is not issued";
//    }
}

