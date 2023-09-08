/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.controller;

import com.ispc.slibrary.dto.Response;
import com.mcss.erp.terminal.data.entity.SaleOrder;
import com.mcss.erp.terminal.model.OrderModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/pos/order/")
public class OrderController {

    @Autowired
    OrderModel orderModel;

    @PostMapping(value = "print")
    public Response print(@RequestBody SaleOrder order) {
        return this.orderModel.print(order);
    }

}
