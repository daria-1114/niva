package com.dx.niva.service;

import com.dx.niva.NoteNotFoundException;
import com.dx.niva.dto.CreateNoteRequest;
import com.dx.niva.dto.NoteResponse;
import com.dx.niva.entity.Note;
import com.dx.niva.entity.User;
import com.dx.niva.enums.Category;
import com.dx.niva.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public NoteResponse createNote(CreateNoteRequest request, User user){
        String title = request.getTitle();
        if(title.isBlank() || title == null){
            title= "Untitled note";
        }
        Note note = new Note();
        note.setTitle(title);
        note.setCategory(request.getCategory());
        note.setContent(request.getContent());
        note.setUser(user);
        note.setCreatedAt(Instant.now());
        Note savedNote = noteRepository.save(note);
        return toResponse(savedNote);
    }

    public List<NoteResponse> getAllNotes(User user){
        List<Note> notes = noteRepository.findByUser(user);
        return notes.stream()
                .map(this::toResponse)
                .toList();
    }

    public List<NoteResponse> getAllNotesByCategory(User user, Category category){
        List<Note> notes = noteRepository.findByUserAndCategory(user, category);
        return notes.stream()
                .map(this::toResponse)
                .toList();
    }

    public NoteResponse updateNote(Long id, CreateNoteRequest request, User user){
        Note note = noteRepository.findByIdAndUser(id, user)
                .orElseThrow(()-> new NoteNotFoundException("Note not found"));
        String title = request.getTitle();
        if(title == null || title.isBlank()){
            title = "Untitled note";
        }
        note.setTitle(title);
        note.setContent(request.getContent());
        note.setCategory(request.getCategory());
        Note saved = noteRepository.save(note);
        return toResponse(saved);
    }
    public void deleteNote(Long id, User user){
        Note note = noteRepository.findByIdAndUser(id, user)
                .orElseThrow(()-> new NoteNotFoundException("Note not found"));
        noteRepository.delete(note);
    }

    private NoteResponse toResponse(Note note){
        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.getCategory(),
                note.getCreatedAt()
        );
    }
}
