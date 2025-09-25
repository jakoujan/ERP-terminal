/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    @Value("${ticket.telephone}")
    private String telephone;
    @Value("${ticket.tax.segment}")
    private String taxSegment;
    @Value("${ticket.tax.id}")
    private String taxId;
    @Value("${ticket.terms.sale.show}")
    private Boolean showTermsOfSale;
    @Value("${ticket.terms.sale}")
    private String termsOfSale;

}
