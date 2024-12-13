package org.example.djfback.Entities;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

@Entity
@Table(name = "etudiant")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Etudiant {

    public void setNoEtudiantNat(Integer noEtudiantNat) {
        this.noEtudiantNat = noEtudiantNat;
    }

    public void setPromotion(String promotion) {
        this.promotion = promotion;
    }

    public void setNoEtudiantUbo(String noEtudiantUbo) {
        this.noEtudiantUbo = noEtudiantUbo;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public void setNationalite(String nationalite) {
        this.nationalite = nationalite;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public void setUniversite(String universite) {
        this.universite = universite;
    }

    // Override toString() for better logging (this is for internal logging, not for JSON)
    @Override
    public String toString() {
        return "Etudiant{" +
                "noEtudiantNat=" + noEtudiantNat +
                ", promotion='" + promotion + '\'' +
                ", noEtudiantUbo='" + noEtudiantUbo + '\'' +
                ", sexe='" + sexe + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", lieuNaissance='" + lieuNaissance + '\'' +
                ", nationalite='" + nationalite + '\'' +
                ", telephone='" + telephone + '\'' +
                ", email='" + email + '\'' +
                ", adresse='" + adresse + '\'' +
                ", universite='" + universite + '\'' +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "no_etudiant_nat")  // Custom column name (if needed)
    private Integer noEtudiantNat;

    @Column(name = "promotion")
    private String promotion;

    @Column(name = "no_etudiant_ubo")
    private String noEtudiantUbo;

    @Column(name = "sexe")
    private String sexe;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @JsonFormat(pattern = "yyyy-MM-dd")  // Custom date format for JSON response
    @Column(name = "date_naissance")
    private Date dateNaissance;

    @Column(name = "lieu_naissance")
    private String lieuNaissance;

    @Column(name = "nationalite")
    @JsonProperty(defaultValue = "Française")  // Default value in case it's not set
    private String nationalite = "Française";

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "email")
    private String email;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "universite")
    private String universite;

    public String getPromotion() {
        return promotion;
    }

    public String getNoEtudiantUbo() {
        return noEtudiantUbo;
    }

    public String getSexe() {
        return sexe;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public String getNationalite() {
        return nationalite;
    }

    public String getTelephone() {
        return telephone;
    }

    public String getEmail() {
        return email;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getUniversite() {
        return universite;
    }

    public Integer getNoEtudiantNat() {
        return noEtudiantNat;
    }
}
