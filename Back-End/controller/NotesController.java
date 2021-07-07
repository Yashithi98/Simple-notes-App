package com.example.demo.controller;

import com.example.demo.model.Notes;
import com.example.demo.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api")

public class NotesController {

    @Autowired
    NotesRepository notesRepository;

    @GetMapping("/notes")
    public ResponseEntity<List<Notes>> getAllNotes(@RequestParam(required = false) String title) {
        try {
            List<Notes> notes = new ArrayList<Notes>();

            if (title == null)
                notesRepository.findAll().forEach(notes::add);
            else
                notesRepository.findByTitleContaining(title).forEach(notes::add);

            if (notes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(notes, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchNote/{id}")
    public ResponseEntity<Notes> getNotesById(@PathVariable("id") long id){
        Optional<Notes> notesData = notesRepository.findById(id);

        if(notesData.isPresent()){
            return new ResponseEntity<>(notesData.get(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createNote")
    public ResponseEntity<Notes> createNotes(@RequestBody Notes note) {
        try {
            Notes _notes = notesRepository
                    .save(new Notes(note.getTitle(), note.getDescription(), false));
            return new ResponseEntity<>(_notes, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateNote/{id}")
    public ResponseEntity<Notes> updateNotes(@PathVariable("id") long id, @RequestBody Notes note) {
        Optional<Notes> notesData = notesRepository.findById(id);

        if (notesData.isPresent()) {
            Notes _notes = notesData.get();
            _notes.setTitle(note.getTitle());
            _notes.setDescription(note.getDescription());
            _notes.setCompleted(note.isCompleted());
            return new ResponseEntity<>(notesRepository.save(_notes), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteNote/{id}")
    public ResponseEntity<HttpStatus> deleteNotes(@PathVariable("id") long id) {
        try {
            notesRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteNotes")
    public ResponseEntity<HttpStatus> deleteAllNotes() {
        try {
            notesRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getCompleted")

    public ResponseEntity<List<Notes>> findByCompleted() {
        try {
            List<Notes> notes = notesRepository.findByCompleted(true);

            if (notes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(notes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

