package com.booknook.booknook_backend.repository;

import com.booknook.booknook_backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Book entity.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Custom query to find a book by its title, ignoring case.
    Book findByTitleIgnoreCase(String title);
}
