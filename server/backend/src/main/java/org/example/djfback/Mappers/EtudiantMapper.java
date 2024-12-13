package org.example.djfback.Mappers;

import org.example.djfback.Entities.Etudiant;
import org.springframework.beans.BeanUtils;

public class EtudiantMapper {
    public Etudiant fromEtudiant(Etudiant etudiant)
    {
        Etudiant newEtudiant = new Etudiant();
        BeanUtils.copyProperties(etudiant,newEtudiant);
        return newEtudiant;

    }
}
