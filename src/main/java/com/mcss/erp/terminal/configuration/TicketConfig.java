/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TicketConfig {

    @Value("${ticket.printer}")
    private String printer;
    @Value("${ticket.logo}")
    private String logoPath;
    @Value("${ticket.bussinesname}")
    private String bussinesName;
    @Value("${ticket.address}")
    private String address;
    
    public TicketConfig() {
    }

    public TicketConfig(String printer, String logoPath, String bussinesName, String address) {
        this.printer = printer;
        this.logoPath = logoPath;
        this.bussinesName = bussinesName;
        this.address = address;
    }

    public String getPrinter() {
        return printer;
    }

    public void setPrinter(String printer) {
        this.printer = printer;
    }

    public String getLogoPath() {
        return logoPath;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath;
    }

    public String getBussinesName() {
        return bussinesName;
    }

    public void setBussinesName(String bussinesName) {
        this.bussinesName = bussinesName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
