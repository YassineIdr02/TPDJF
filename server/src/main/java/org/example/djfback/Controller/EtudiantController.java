package org.example.djfback.Controller;
import org.example.djfback.DTOs.EtudiantDTO;
import org.example.djfback.Entities.Etudiant;
import org.example.djfback.Services.EtudiantService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

    private final EtudiantService etudiantService;


    public EtudiantController(EtudiantService etudiantService) {
        this.etudiantService = etudiantService;
    }

    // Get all Etudiants
    @GetMapping
    public ResponseEntity<List<EtudiantDTO>> getAllEtudiants() {
        List<EtudiantDTO> etudiants = etudiantService.getAllEtudiants();
        System.out.println(etudiants);
        return new ResponseEntity<>(etudiants, HttpStatus.OK);
    }

    // Get Etudiant by ID
    @GetMapping("/{id}")
    public ResponseEntity<EtudiantDTO> getEtudiantById(@PathVariable Integer id) {
        return etudiantService.getEtudiantById(id)
                .map(etudiant -> new ResponseEntity<>(etudiant, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new Etudiant
    @PostMapping
    public ResponseEntity<Etudiant> createEtudiant(@RequestBody EtudiantDTO etudiant) {
        Etudiant createdEtudiant = etudiantService.saveEtudiant(etudiant);
        return new ResponseEntity<>(createdEtudiant, HttpStatus.CREATED);
    }

    // Update an existing Etudiant
    @PutMapping("/{id}")
    public void updateEtudiant(
            @PathVariable Integer id,
            @RequestBody EtudiantDTO etudiant) {
        try {
            etudiantService.updateEtudiant(id, etudiant);

        } catch (RuntimeException e) {

        }    }

    // Delete an Etudiant
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Integer id) {
        try {
            etudiantService.deleteEtudiant(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}