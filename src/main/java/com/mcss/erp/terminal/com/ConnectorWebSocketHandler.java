package com.mcss.erp.terminal.com;

import com.jakdev.jcom.Communicator;
import com.jakdev.jcom.dto.Read;
import com.jakdev.jcom.eth.EthernetCommunicator;
import com.jakdev.jcom.serial.PortConfiguration;
import com.jakdev.jcom.serial.PortData;
import com.jakdev.jcom.serial.SerialCommunicator;
import jssc.SerialPortException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@Getter
@Component
public class ConnectorWebSocketHandler extends TextWebSocketHandler {

    private static final String PATTERN = "[^-?\\d.]";
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
    @Value("${port.type:serial}")
    String type;

    private Communicator portCommunicator;
    private String last = "";
    ScheduledExecutorService scheduler =
            Executors.newSingleThreadScheduledExecutor();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            var portConfig = new PortConfiguration(name, baudrate, PortData.findParity(parity), databits, PortData.findStopBits(stopbit));
            if (type.equals("serial")) {
                this.portCommunicator = new SerialCommunicator(portConfig, (line) -> {
                    var data = line.replaceAll(PATTERN, "").trim();
                    log.info("line Serial: [{}]", line);
                    if (!data.equals(last)) {
                        last = data;
                        Read read = new Read();
                        read.setValue(new BigDecimal(data));
                        log.info("read Serial: [{}]", read.getValue().toString());
                        TextMessage message = new TextMessage(read.toString());
                        try {
                            session.sendMessage(message);
                        } catch (IOException e) {
                            log.error("Error al enviar mesaje WS", e);
                        }
                    }
                });
            } else {
                this.portCommunicator = EthernetCommunicator.builder().host(host).port(port).action((line) -> {
                    var data = line.replaceAll(PATTERN, "").trim();
                    log.info("line: [{}]", line);
                    if (!data.equals(last)) {
                        last = data;
                        Read read = new Read();
                        read.setValue(new BigDecimal(data));
                        log.info("read: [{}]", read.getValue().toString());
                        TextMessage message = new TextMessage(read.getValue().toString());
                        try {
                            session.sendMessage(message);
                        } catch (IOException e) {
                            log.error("Error al enviar mesaje WS", e);
                        }
                    }
                }).sendSameValue(false).timeout(60).build();
            }
            this.portCommunicator.connect();
            this.startCommunication();
        } catch (SerialPortException e) {
            log.error("Error initializing port communicator", e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("Stopping communication...");

        scheduler.shutdownNow(); // interrumpe el sleep
        try {
            if (!scheduler.awaitTermination(2, TimeUnit.SECONDS)) {
                log.warn("No se pudo detener el hilo a tiempo");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        this.portCommunicator.disconnect();
    }

    public void startCommunication() {
        if (!portCommunicator.isConnected()) {
            log.warn("Puerto no conectado");
            return;
        }
        scheduler.scheduleAtFixedRate(() -> {
            try {
                portCommunicator.write("P");
            } catch (SerialPortException e) {
                log.error("Error al enviar", e);
            }
        }, 0, 500, TimeUnit.MILLISECONDS);
    }

    public boolean isConnected() {
        return this.portCommunicator != null && this.portCommunicator.isConnected();
    }

}
