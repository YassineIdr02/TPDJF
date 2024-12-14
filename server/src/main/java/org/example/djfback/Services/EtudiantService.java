package org.example.djfback.Services;
import org.example.djfback.DAO.EtudiantDAO;
import org.example.djfback.DTOs.EtudiantDTO;
import org.example.djfback.Entities.Etudiant;
import org.example.djfback.Entities.Promotion;
import org.example.djfback.Mappers.EtudiantMapper;
import org.example.djfback.Repositories.EtudiantRepository;
import org.example.djfback.Repositories.PromotionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EtudiantService  implements EtudiantDAO {

    private final EtudiantRepository etudiantRepository;
    private final EtudiantMapper etudiantMapper;
    private final PromotionRepository promotionRepository;

    public EtudiantService(EtudiantRepository etudiantRepository, EtudiantMapper etudiantMapper, PromotionRepository promotionRepository) {
        this.etudiantRepository = etudiantRepository;
        this.etudiantMapper = etudiantMapper;
        this.promotionRepository = promotionRepository;
    }


    @Override
    public List<EtudiantDTO> getAllEtudiants() {
        List<Etudiant> etudiants = etudiantRepository.findAll();
        List<EtudiantDTO> etudiantDTOs = etudiants.stream().map(etd ->etudiantMapper.fromEtudiant(etd)).collect(Collectors.toList());
        return etudiantDTOs;
    }


    @Override
    public Optional<EtudiantDTO> getEtudiantById(Integer id) {
        Etudiant etudiant = etudiantRepository.findById(id).orElseThrow(()->new RuntimeException("Club Not Found"));
        return Optional.of(etudiantMapper.fromEtudiant(etudiant));
    }

    @Override
    public Etudiant saveEtudiant(EtudiantDTO Etudiant) {
        Promotion promotion = promotionRepository.findById(Etudiant.getAnneePro()).orElseThrow(()->new RuntimeException("Promotion Not Found"));
        Etudiant etudiant = etudiantMapper.fromEtudiantDTO(Etudiant);
        etudiant.setPromotion(promotion);
        return etudiantRepository.save(etudiant);
    }

    @Override
    public void updateEtudiant(Integer id, EtudiantDTO etudiant) {
        Etudiant existingEtudiant = etudiantRepository.findById(id).orElseThrow(()->new RuntimeException("Student Not Found"));
        existingEtudiant = etudiantMapper.fromEtudiantDTOToEtudiant(etudiant,existingEtudiant);
        Promotion promotion = promotionRepository.findById(etudiant.getAnneePro()).orElseThrow(()->new RuntimeException("Promotion Not Found"));
        existingEtudiant.setPromotion(promotion);
        etudiantRepository.save(existingEtudiant);
    }

    @Override
    public void deleteEtudiant(Integer id) {
        etudiantRepository.deleteById(id);

    }
}