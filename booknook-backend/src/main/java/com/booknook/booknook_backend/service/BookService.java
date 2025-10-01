package com.booknook.booknook_backend.service;

import com.booknook.booknook_backend.model.Book;
import com.booknook.booknook_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }


    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Book with id " + id + " does not exist"));

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setDescription(bookDetails.getDescription());
        book.setPublisher(bookDetails.getPublisher());
        book.setPublicationYear(bookDetails.getPublicationYear());
        book.setGenre(bookDetails.getGenre());

        return bookRepository.save(book);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBook(Long id) {
        boolean exists = bookRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Book with id " + id + " does not exist");
        }
        bookRepository.deleteById(id);
    }
}

