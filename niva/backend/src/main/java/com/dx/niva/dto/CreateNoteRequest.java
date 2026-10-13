package com.dx.niva.dto;

import com.dx.niva.enums.Category;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNoteRequest {
    private String title;
    private String content;
    @NotNull
    private Category category;

}
