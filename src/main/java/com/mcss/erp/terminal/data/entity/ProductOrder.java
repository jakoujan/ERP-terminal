/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class ProductOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private BigDecimal quantity;
    private BigDecimal price;
    private BigDecimal amount;
    private Integer pieces;
    private Product product;
    private Boolean edited;

    public ProductOrder() {
    }

    public ProductOrder(Integer id) {
        this.id = id;
    }

    public ProductOrder(Integer id, BigDecimal quantity, BigDecimal price, BigDecimal amount) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.amount = amount;
    }
}
