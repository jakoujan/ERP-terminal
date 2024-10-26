package com.mcss.erp.terminal.data.entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CustomerProductPrice {
    private int id;
    private Product product;
    private BigDecimal price;
}
