package com.dx.niva.dto;

import com.dx.niva.entity.Note;
import com.dx.niva.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponse {
    private Long id;
    private String title;
    private String content;
    private Category category;
    private Instant createdAt;

}
