/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.model;

import com.ispc.slibrary.dto.Response;
import com.mcss.erp.terminal.data.entity.SaleOrder;

/**
 *
 * @author edgar
 */
public interface OrderModel {

    public Response print(SaleOrder order);
    
}
