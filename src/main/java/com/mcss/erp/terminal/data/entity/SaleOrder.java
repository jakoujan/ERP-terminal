/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.data.entity;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class SaleOrder implements Serializable {

    private static final long serialVersionUID = 1L;
    private String id;
    private String uuid;
    private Date orderDate;
    private BigDecimal amount;
    private BigDecimal taxes;
    private BigDecimal total;
    private List<ProductOrder> products;
    private Customer customer;
    private SaleType saleType;
    private OrderStatus orderStatus;
    private User user;

    public SaleOrder() {
    }

    public SaleOrder(String id) {
        this.id = id;
    }

    public SaleOrder(String id, String uuid, Date orderDate, BigDecimal amount, BigDecimal taxes, BigDecimal total) {
        this.id = id;
        this.uuid = uuid;
        this.orderDate = orderDate;
        this.amount = amount;
        this.taxes = taxes;
        this.total = total;
    }
}
