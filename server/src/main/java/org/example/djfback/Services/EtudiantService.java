package org.example.djfback.Services;

import org.example.djfback.DAO.EtudiantDAO;
import org.example.djfback.Entities.Etudiant;
import org.example.djfback.Repositories.EtudiantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService  implements EtudiantDAO {
    private final EtudiantRepository etudiantRepository;


    public EtudiantService(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }


    @Override
    public List<Etudiant> getAllEtudiants() {
        System.out.println("getAllEtudiants : "+ etudiantRepository.findAll());
        return etudiantRepository.findAll();
    }

    @Override
    public Optional<Etudiant> getEtudiantById(Integer id) {
        return etudiantRepository.findById(id);
    }

    @Override
    public Etudiant saveEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    @Override
    public Etudiant updateEtudiant(Integer id, Etudiant etudiant) {
        Etudiant existingEtudiant = etudiantRepository.findById(id).orElseThrow(()->new RuntimeException("Club Not Found"));
        return etudiantRepository.save(etudiant);
    }

    @Override
    public void deleteEtudiant(Integer id) {
        etudiantRepository.deleteById(id);

    }
}

