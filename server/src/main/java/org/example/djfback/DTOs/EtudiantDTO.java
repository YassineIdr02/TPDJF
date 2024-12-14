package org.example.djfback.DTOs;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
public class EtudiantDTO {

    private Integer noEtudiantNat;
    private Integer anneePro;
    private String noEtudiantUbo;
    private String sexe;
    private String nom;
    private String prenom;
    private Date dateNaissance;
    private String lieuNaissance;
    private String nationalite = "Française";
    private String telephone;
    private String email;
    private String adresse;
    private String universite;

    @Override
    public String toString() {
        return "EtudiantDTO{" +
                "noEtudiantNat=" + noEtudiantNat +
                ", anneePro=" + anneePro +
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

    public Integer getNoEtudiantNat() {
        return noEtudiantNat;
    }

    public void setNoEtudiantNat(Integer noEtudiantNat) {
        this.noEtudiantNat = noEtudiantNat;
    }

    public Integer getAnneePro() {
        return anneePro;
    }

    public void setAnneePro(Integer anneePro) {
        this.anneePro = anneePro;
    }

    public String getNoEtudiantUbo() {
        return noEtudiantUbo;
    }

    public void setNoEtudiantUbo(String noEtudiantUbo) {
        this.noEtudiantUbo = noEtudiantUbo;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getNationalite() {
        return nationalite;
    }

    public void setNationalite(String nationalite) {
        this.nationalite = nationalite;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getUniversite() {
        return universite;
    }

    public void setUniversite(String universite) {
        this.universite = universite;
    }
}
