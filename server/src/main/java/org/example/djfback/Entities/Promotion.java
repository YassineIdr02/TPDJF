package org.example.djfback.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "promotion")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "annee_pro")
    private Integer anneePro;

    @Column(name = "sigle_pro")
    private String siglePro;

    @Column(name = "nb_etu_souhaite")
    private Integer nbEtuSouhaite;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_rentree")
    private Date dateRentree;

    @Column(name = "lieu_rentree")
    private String lieuRentree;

    @OneToMany(mappedBy = "promotion", fetch = FetchType.LAZY)
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