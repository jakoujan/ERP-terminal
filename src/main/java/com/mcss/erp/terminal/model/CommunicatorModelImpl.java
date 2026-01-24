package com.mcss.erp.terminal.model;

import com.jakdev.jcom.serial.PortData;
import com.mcss.erp.terminal.com.ConnectorWebSocketHandler;
import com.mcss.erp.terminal.dto.CommunicatorStatus;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
@Slf4j
public class CommunicatorModelImpl implements CommunicatorModel {

    ConnectorWebSocketHandler handler;

    @Override
    public CommunicatorStatus checkStatus() {
        return CommunicatorStatus.builder().connected(handler.isConnected())
                .ports(PortData.searchForPorts())
                .build();
    }
}
