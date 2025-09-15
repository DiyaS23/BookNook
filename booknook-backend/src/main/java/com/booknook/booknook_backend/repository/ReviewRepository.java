package com.booknook.booknook_backend.repository;

import com.booknook.booknook_backend.model.Book;
import com.booknook.booknook_backend.model.Review;
import com.booknook.booknook_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBookId(Long bookId);
}
