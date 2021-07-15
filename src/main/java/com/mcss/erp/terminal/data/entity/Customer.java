/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;

public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;
    private Integer id;
    private String uuid;
    private String businessName;
    private String externalNumber;
    private String street;
    private String internalNumber;
    private String settlement;
    private String county;
    private String city;
    private String postalCode;
    private State state;

    public Customer() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Customer)) {
            return false;
        }
        Customer other = (Customer) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mcss.erp.data.entity.Customer[ id=" + id + " ]";
    }

    @JsonIgnore
    public String getAddress() {
        StringBuilder sb = new StringBuilder(this.street);
        sb.append(" ").append(this.externalNumber)
                .append(" ").append(this.internalNumber)
                .append("##").append(this.settlement)
                .append(", ").append(this.county)
                .append("##").append(this.city)
                .append(",").append(this.postalCode)
                .append("##").append(this.state);
        return sb.toString();

    }

}
