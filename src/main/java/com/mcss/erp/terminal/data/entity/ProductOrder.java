/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;

public class ProductOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private BigDecimal quantity;
    private BigDecimal price;
    private BigDecimal amount;
    private Integer pieces;
    private SaleOrder saleOrder;
    private Product product;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getPieces() {
        return pieces;
    }

    public void setPieces(Integer pieces) {
        this.pieces = pieces;
    }

    @JsonIgnore
    public SaleOrder getSaleOrder() {
        return saleOrder;
    }

    public void setSaleOrder(SaleOrder saleOrder) {
        this.saleOrder = saleOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        if (!(object instanceof ProductOrder)) {
            return false;
        }
        ProductOrder other = (ProductOrder) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mcss.erp.data.entity.ProductOrder[ id=" + id + " ]";
    }

}
