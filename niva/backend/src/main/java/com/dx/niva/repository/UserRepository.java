package com.dx.niva.repository;

import com.dx.niva.entity.User;
import org.hibernate.internal.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

}
