package com.booknook.booknook_backend.service;
import com.booknook.booknook_backend.model.ReadingList;
import com.booknook.booknook_backend.model.User;
import com.booknook.booknook_backend.repository.ReadingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ReadingListService {
    private final ReadingListRepository readingListRepository;

    @Autowired
    public ReadingListService(ReadingListRepository readingListRepository) {
        this.readingListRepository = readingListRepository;
    }


    public ReadingList createReadingList(ReadingList list) {
        return readingListRepository.save(list);
    }
    public Optional<ReadingList> getReadingListById(Long id) {
        return readingListRepository.findById(id);
    }
    public ReadingList updateReadingList(Long id, ReadingList listDetails) {
        ReadingList readingList = readingListRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Reading list entry with id " + id + " does not exist"));

        readingList.setStatus(listDetails.getStatus());

        return readingListRepository.save(readingList);
    }

    public List<ReadingList> getReadingListsByUserId(Long userId) {
        return readingListRepository.findByUserId(userId);
    }

    public void deleteReadingList(Long id) {
        boolean exists = readingListRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Reading list entry with id " + id + " does not exist");
        }
        readingListRepository.deleteById(id);
    }
    public List<ReadingList> getAllReadingLists() {
        return readingListRepository.findAll();
    }
}
