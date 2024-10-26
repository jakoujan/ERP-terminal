package com.mcss.erp.terminal.com;

import com.mcss.erp.terminal.com.action.PortReaderAction;
import com.mcss.mcom.Communicator;
import com.mcss.mcom.eth.EthernetCommunicator;
import com.mcss.mcom.serial.PortConfig;
import com.mcss.mcom.serial.SerialCommunicator;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class ConnectorHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ConnectorHandler.class);

    @Value("${port.name}")
    String name;
    @Value("${port.baudrate}")
    Integer baudrate;
    @Value("${port.parity}")
    Integer parity;
    @Value("${port.databits}")
    Integer databits;
    @Value("${port.stopbit}")
    Integer stopbit;
    @Value("${port.host}")
    String host;
    @Value("${port.port}")
    Integer port;

    @Autowired
    PortReaderAction action;

    private PortConfig portConfig;

    Communicator portCommunicator;
    private boolean running = true;

    public ConnectorHandler() {
    }


    @PostConstruct
    public void onInit() throws Exception {
        this.portConfig = new PortConfig(name, baudrate, parity, databits, stopbit);
        if (LOGGER.isTraceEnabled()) {
            this.portCommunicator = new EthernetCommunicator(host, port, action, 60);
            this.running = false;
        } else {
            this.portCommunicator = new SerialCommunicator(portConfig, action);
        }
        this.portCommunicator.connect();
        this.startCommunication();
    }

    private void startCommunication() throws Exception {
        LOGGER.info("Start communication with scale");
        Thread t = new Thread("Serial handler") {
            @Override
            public void run() {
                do {
                    try {
                        portCommunicator.write("P", false);
                        Thread.sleep(500);
                    } catch (Exception ex) {
                        LOGGER.error("Error al enviar", ex);
                    }
                } while (running);
            }
        };
        if (LOGGER.isErrorEnabled()) {
            t.start();
        }
    }

    @PreDestroy
    public void onQuit() throws Exception {
        this.portCommunicator.disconnect();
        this.running = false;
    }

}
