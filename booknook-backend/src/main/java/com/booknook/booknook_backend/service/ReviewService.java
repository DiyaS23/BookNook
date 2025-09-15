package com.booknook.booknook_backend.service;

import com.booknook.booknook_backend.model.Book;
import com.booknook.booknook_backend.model.Review;
import com.booknook.booknook_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review reviewDetails) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Review with id " + id + " does not exist"));

        review.setReviewText(reviewDetails.getReviewText());
        review.setRating(reviewDetails.getRating());

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }

    public void deleteReview(Long id) {
        boolean exists = reviewRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Review with id " + id + " does not exist");
        }
        reviewRepository.deleteById(id);
    }

}
