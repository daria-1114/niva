package com.dx.niva.repository;

import com.dx.niva.entity.Note;
import com.dx.niva.entity.User;
import com.dx.niva.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository  extends JpaRepository<Note, Long> {
    List<Note> findByUser(User user);
    List<Note> findByUserAndCategory(User user, Category category);
    Optional<Note> findByIdAndUser(Long id, User user);
}
