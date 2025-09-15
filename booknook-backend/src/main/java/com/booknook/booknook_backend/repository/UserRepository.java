package com.booknook.booknook_backend.repository;

import com.booknook.booknook_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for User entity.
 * JpaRepository provides out-of-the-box methods for CRUD operations.
 * The generic parameters are the Entity type (User) and the type of its primary key (Long).
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom methods here. Spring Data JPA will
    // automatically generate the implementation based on the method name.
    User findByUsername(String username);
}
