/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.model;

import com.ispc.slibrary.dto.Response;
import com.mcss.erp.terminal.configuration.TicketConfig;
import com.mcss.erp.terminal.data.entity.SaleOrder;
import com.mcss.erp.terminal.print.PrintJob;
import com.mcss.erp.terminal.print.ThermalTicketPrintJob;
import java.io.IOException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderModelImpl implements OrderModel {

    private static final Logger LOGGER = Logger.getLogger(OrderModelImpl.class);

    @Autowired
    TicketConfig config;

    @Override
    public Response print(SaleOrder order) {
        Response response = Response.getInstance();
        try {
            PrintJob pj = new ThermalTicketPrintJob(config);
            pj.print(order);
        } catch (IOException ex) {
            LOGGER.error(ex);
            response.setMessage("Error al imprimir ticket " + ex.getMessage());
            response.setCode(500);
        }
        return response;
    }

}
