package org.example.djfback.DTOs;


import org.example.djfback.Entities.Etudiant;

import java.util.Date;
import java.util.List;

public class PromotionDTO {
    private Integer anneePro;

    private String siglePro;

    private Integer nbEtuSouhaite;

    private Date dateRentree;

    private String lieuRentree;

    private List<Etudiant> etudiants;

    public void setAnneePro(Integer anneePro) {
        this.anneePro = anneePro;
    }

    public void setEtudiants(List<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }

    public Integer getAnneePro() {
        return anneePro;
    }

    public List<Etudiant> getEtudiants() {
        return etudiants;
    }

    public String getSiglePro() {
        return siglePro;
    }

    public void setSiglePro(String siglePro) {
        this.siglePro = siglePro;
    }

    public Integer getNbEtuSouhaite() {
        return nbEtuSouhaite;
    }

    public void setNbEtuSouhaite(Integer nbEtuSouhaite) {
        this.nbEtuSouhaite = nbEtuSouhaite;
    }

    public Date getDateRentree() {
        return dateRentree;
    }

    public void setDateRentree(Date dateRentree) {
        this.dateRentree = dateRentree;
    }

    public String getLieuRentree() {
        return lieuRentree;
    }

    public void setLieuRentree(String lieuRentree) {
        this.lieuRentree = lieuRentree;
    }

    @Override
    public String toString() {
        return "Promotion{" +
                "anneePro=" + anneePro +
                ", siglePro='" + siglePro + '\'' +
                ", nbEtuSouhaite=" + nbEtuSouhaite +
                ", dateRentree=" + dateRentree +
                ", lieuRentree='" + lieuRentree + '\'' +
                '}';
    }
}





