package com.dx.niva.controller;

import com.dx.niva.dto.CreateNoteRequest;
import com.dx.niva.dto.NoteResponse;
import com.dx.niva.entity.User;
import com.dx.niva.enums.Category;
import com.dx.niva.repository.NoteRepository;
import com.dx.niva.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<NoteResponse> createNote(@Valid @RequestBody CreateNoteRequest request, @AuthenticationPrincipal User user){
        NoteResponse note = noteService.createNote(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(note);
    }
    @GetMapping
    public ResponseEntity<List<NoteResponse>> getNotes(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(noteService.getAllNotes(user));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<NoteResponse>> getNotesByCategory(@PathVariable Category category, @AuthenticationPrincipal User user){
        return ResponseEntity.ok(noteService.getAllNotesByCategory(user, category));
    }
    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> updateNOte(@PathVariable Long id, @Valid @RequestBody CreateNoteRequest request, @AuthenticationPrincipal User user){
        NoteResponse note = noteService.updateNote(id, request,user);
        return ResponseEntity.ok(note);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id,
                                           @AuthenticationPrincipal User user) {
        noteService.deleteNote(id, user);
        return ResponseEntity.noContent().build();
    }

}
