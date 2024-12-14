package org.example.djfback.DAO;


import org.example.djfback.DTOs.EtudiantDTO;
import org.example.djfback.Entities.Etudiant;

import java.util.List;
import java.util.Optional;

public interface EtudiantDAO {
    List<EtudiantDTO> getAllEtudiants();
    Optional<EtudiantDTO> getEtudiantById(Integer id);
    Etudiant saveEtudiant(EtudiantDTO etudiant);
    void updateEtudiant(Integer id, EtudiantDTO etudiant);
    void deleteEtudiant(Integer id);
}