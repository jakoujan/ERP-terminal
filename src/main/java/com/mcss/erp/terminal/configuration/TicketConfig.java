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
    @Value("${ticket.slogan}")
    private String slogan;
    @Value("${ticket.address}")
    private String address;
    @Value("${ticket.footer}")
    private String footer;
    @Value("${ticket.taxid}")
    private String taxid;
    @Value("${ticket.phone}")
    private String phone;
    @Value("${ticket.whatsapp}")
    private String whatsapp;

    public TicketConfig() {
    }

    public TicketConfig(String printer, String logoPath, String bussinesName, String address, String slogan, String footer) {
        this.printer = printer;
        this.logoPath = logoPath;
        this.bussinesName = bussinesName;
        this.address = address;
        this.slogan = slogan;
        this.footer = footer;
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

    public String getSlogan() {
        return slogan;
    }

    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }

    public String getFooter() {
        return footer;
    }

    public void setFooter(String footer) {
        this.footer = footer;
    }

    public String getTaxid() {
        return taxid;
    }

    public void setTaxid(String taxid) {
        this.taxid = taxid;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

}
