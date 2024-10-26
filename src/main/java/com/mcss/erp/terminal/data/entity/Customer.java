/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.data.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;
    private Integer id;
    private String uuid;
    private String businessName;
    private List<CustomerProductPrice> products;

}
