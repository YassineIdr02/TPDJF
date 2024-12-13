package org.example.djfback.DAO;

import org.example.djfback.Entities.Etudiant;

import java.util.List;
import java.util.Optional;

public interface EtudiantDAO {
    List<Etudiant> getAllEtudiants();
    Optional<Etudiant> getEtudiantById(Integer id);
    Etudiant saveEtudiant(Etudiant etudiant);
    Etudiant updateEtudiant(Integer id, Etudiant etudiant);
    void deleteEtudiant(Integer id);
}
