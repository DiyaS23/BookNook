package com.booknook.booknook_backend.repository;
import com.booknook.booknook_backend.model.Book;
import com.booknook.booknook_backend.model.ReadingList;
import com.booknook.booknook_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ReadingListRepository extends JpaRepository<ReadingList, Long>{
    List<ReadingList> findByUserId(Long userId);
}
