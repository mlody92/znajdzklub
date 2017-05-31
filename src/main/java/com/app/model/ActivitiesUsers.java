/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.validator.constraints.NotEmpty;

@XmlRootElement
@Entity
@Table(name = "ACTIVITIES_USER")
public class ActivitiesUsers implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

//    @NotEmpty
    @Column(name = "ACTIVITIES_ID",  nullable = false)
    private Integer activitiesId;
//    @NotEmpty
    @Column(name = "USER_ID",  nullable = false)
    private Integer userId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getActivitiesId() {
        return activitiesId;
    }

    public void setActivitiesId(Integer activitiesId) {
        this.activitiesId = activitiesId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        return true;
    }

    @Override
    public String toString() {
        return "";
    }
}
