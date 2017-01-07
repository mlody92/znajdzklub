/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@Table(name = "COORDINATES")
public class Coordinates implements Serializable {

    @Id
    @Column(name = "kod_pocztowy", unique = true)
    private String kodPocztowy;

    @Column(name = "wojewodztwo")
    private String wojewodztwo;

    @Column(name = "miasto")
    private String miasto;

    @Column(name = "dl_geo")
    private String dlugosc;

    @Column(name = "sz_geo")
    private String szerokosc;

    public String getKodPocztowy() {
        return kodPocztowy;
    }

    public void setKodPocztowy(String kodPocztowy) {
        this.kodPocztowy = kodPocztowy;
    }

    public String getWojewodztwo() {
        return wojewodztwo;
    }

    public void setWojewodztwo(String wojewodztwo) {
        this.wojewodztwo = wojewodztwo;
    }

    public String getMiasto() {
        return miasto;
    }

    public void setMiasto(String miasto) {
        this.miasto = miasto;
    }

    public String getDlugosc() {
        return dlugosc;
    }

    public void setDlugosc(String dlugosc) {
        this.dlugosc = dlugosc;
    }

    public String getSzerokosc() {
        return szerokosc;
    }

    public void setSzerokosc(String szerokosc) {
        this.szerokosc = szerokosc;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((kodPocztowy == null) ? 0 : kodPocztowy.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        return true;
    }

    @Override
    public String toString() {
        return "Coordinates";
    }
}
