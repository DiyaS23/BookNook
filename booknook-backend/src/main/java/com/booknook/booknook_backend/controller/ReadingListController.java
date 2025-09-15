package com.booknook.booknook_backend.controller;
import com.booknook.booknook_backend.model.ReadingList;
import com.booknook.booknook_backend.service.ReadingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/readinglists")
public class ReadingListController {

    private final ReadingListService readingListService;

    @Autowired
    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }

    @GetMapping
    public List<ReadingList> getAllReadingLists() {
        return readingListService.getAllReadingLists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReadingList> getReadingListById(@PathVariable Long id) {
        return readingListService.getReadingListById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ReadingList> createReadingList(@RequestBody ReadingList list) {
        ReadingList createdList = readingListService.createReadingList(list);
        return new ResponseEntity<>(createdList, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReadingList> updateReadingList(@PathVariable Long id, @RequestBody ReadingList listDetails) {
        return ResponseEntity.ok(readingListService.updateReadingList(id, listDetails));
    }

    @GetMapping("/user/{userId}")
    public List<ReadingList> getReadingListsByUserId(@PathVariable Long userId) {
        return readingListService.getReadingListsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReadingList(@PathVariable Long id) {
        readingListService.deleteReadingList(id);
        return ResponseEntity.noContent().build();
    }
}