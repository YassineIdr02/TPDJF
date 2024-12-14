package org.example.djfback.Mappers;

import org.example.djfback.DTOs.EtudiantDTO;
import org.example.djfback.Entities.Etudiant;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service

public class EtudiantMapper {
    public EtudiantDTO fromEtudiant(Etudiant etudiant)
    {
        EtudiantDTO newEtudiant = new EtudiantDTO();
        BeanUtils.copyProperties(etudiant,newEtudiant);
        newEtudiant.setAnneePro(etudiant.getPromotion().getAnneePro());
        return  newEtudiant;

    }

    public Etudiant fromEtudiantDTO (EtudiantDTO etudiant)
    {
        Etudiant newEtudiant = new Etudiant();
        BeanUtils.copyProperties(etudiant,newEtudiant);
        return  newEtudiant;

    }

    public Etudiant fromEtudiantDTOToEtudiant (EtudiantDTO etudiant, Etudiant existingEtudiant)
    {
        BeanUtils.copyProperties(etudiant,existingEtudiant);
        return  existingEtudiant;

    }
}