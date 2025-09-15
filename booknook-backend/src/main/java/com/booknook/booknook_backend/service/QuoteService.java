package com.booknook.booknook_backend.service;

import com.booknook.booknook_backend.model.Book;
import com.booknook.booknook_backend.model.Quote;
import com.booknook.booknook_backend.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuoteService {
    @Autowired
    private QuoteRepository quoteRepository;

    public Quote createQuote(Quote quote) {
        return quoteRepository.save(quote);
    }
    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    public Optional<Quote> getQuoteById(Long id) {
        return quoteRepository.findById(id);
    }
    public Quote updateQuote(Long id, Quote quoteDetails) {
        Quote quote = quoteRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Quote with id " + id + " does not exist"));

        quote.setQuoteText(quoteDetails.getQuoteText());
        quote.setPageNumber(quoteDetails.getPageNumber());

        return quoteRepository.save(quote);
    }

    public void deleteQuote(Long id) {
        boolean exists = quoteRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Quote with id " + id + " does not exist");
        }
        quoteRepository.deleteById(id);
    }

    public List<Quote> getQuotesByBookId(Long bookId) {
        return quoteRepository.findByBookId(bookId);
    }
}

