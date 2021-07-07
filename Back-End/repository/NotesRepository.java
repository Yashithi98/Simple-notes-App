package com.example.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Notes;

public interface NotesRepository extends JpaRepository<Notes, Long> {
    List<Notes> findByCompleted(boolean completed);
    List<Notes> findByTitleContaining(String title);
}