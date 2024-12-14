package org.example.djfback.Services;

import org.example.djfback.DTOs.EtudiantDTO;
import org.example.djfback.Entities.Promotion;
import org.example.djfback.Mappers.EtudiantMapper;
import org.example.djfback.Repositories.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PromotionService {


    private final PromotionRepository promotionRepository;
    private final EtudiantMapper etudiantMapper;

    public PromotionService(PromotionRepository promotionRepository, EtudiantMapper etudiantMapper) {
        this.promotionRepository = promotionRepository;
        this.etudiantMapper = etudiantMapper;
    }

    // Retrieve all promotions
    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    // Retrieve a specific promotion by ID
    public Optional<Promotion> getPromotionById(Integer id) {
        return promotionRepository.findById(id);
    }

    // Add a new promotion
    public Promotion createPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    // Update an existing promotion
    public Promotion updatePromotion(Integer id, Promotion updatedPromotion) {
        return promotionRepository.findById(id).map(promotion -> {
            promotion.setSiglePro(updatedPromotion.getSiglePro());
            promotion.setNbEtuSouhaite(updatedPromotion.getNbEtuSouhaite());
            promotion.setDateRentree(updatedPromotion.getDateRentree());
            promotion.setLieuRentree(updatedPromotion.getLieuRentree());
            return promotionRepository.save(promotion);
        }).orElseThrow(() -> new RuntimeException("Promotion not found with id " + id));
    }

    // Delete a promotion
    public void deletePromotion(Integer id) {
        promotionRepository.deleteById(id);
    }

    public List<EtudiantDTO> getAllStudentsByPromotion(Integer id){
        Promotion promotion = promotionRepository.findById(id).orElseThrow(()->new RuntimeException("Promotion Not Found"));
        System.out.println(promotion);
        List<EtudiantDTO> etudiants = promotion.getEtudiants().stream().map(etd ->etudiantMapper.fromEtudiant(etd)).collect(Collectors.toList());
        return etudiants;
    }
}