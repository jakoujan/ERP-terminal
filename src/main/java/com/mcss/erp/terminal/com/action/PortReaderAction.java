/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.com.action;

import com.mcss.erp.terminal.Constants;
import com.mcss.mcom.action.ReaderAction;
import com.mcss.mcom.dto.Read;
import java.math.BigDecimal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class PortReaderAction implements ReaderAction {

    private static final Logger LOGGER = LoggerFactory.getLogger(PortReaderAction.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    private String last = "";

    public PortReaderAction() {
        LOGGER.info("Se crea reader");
    }

    @Override
    public void doTask(String line) {
        String data = "";
        try {
            data = line.replaceAll(PATTERN, "").trim();
            if (!data.equals(last)) {
                last = data;
                Read read = new Read();
                read.setValue(new BigDecimal(data));
                this.messagingTemplate.convertAndSend(Constants.PORT_TOPIC, read);
                LOGGER.info("read: [" + read.getValue().toString() + ']');
            }

        } catch (Exception e) {
            LOGGER.error("Error en lectura: data: [" + data + ']', e);
        }
    }

    @Override
    public void reset() {
        this.last = "";
    }

    @Override
    public void doTask(byte[] buffer) {

    }
}
