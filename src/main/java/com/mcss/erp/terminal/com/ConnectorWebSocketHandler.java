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
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
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
    @Value("${read.start:1}")
    Integer start;
    @Value("${read.end:7}")
    Integer end;

    private Communicator portCommunicator;
    private String last = "";
    ScheduledExecutorService scheduler =
            Executors.newSingleThreadScheduledExecutor();
    ScheduledFuture<?> future;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            var portConfig = new PortConfiguration(getName(session).isEmpty() ? name : getName(session).get(),
                    baudrate, PortData.findParity(parity), databits, PortData.findStopBits(stopbit));
            if (type.equals("serial")) {
                this.portCommunicator = new SerialCommunicator(portConfig, line -> {
                    var data = line.substring(start, end).trim();
                    log.info("line Serial: [{}]", line);
                    log.info("procesed: [{}]", data);
                    if (!data.equals(last)) {
                        try {
                            last = data;
                            Read read = new Read();
                            read.setValue(new BigDecimal(data));
                            log.info("read Serial: [{}]", read.getValue().toString());
                            TextMessage message = new TextMessage(read.getValue().toString());
                            session.sendMessage(message);
                        } catch (IOException | NumberFormatException e) {
                            log.error("Error al enviar mensaje WS", e);
                            TextMessage message = new TextMessage("ERR.");
                            try {
                                session.sendMessage(message);
                            } catch (IOException ex) {
                                log.error("Error al enviar mensaje WS", e);
                            }
                        }
                    }
                });
            } else {
                this.portCommunicator = EthernetCommunicator.builder().host(host).port(port).action((line) -> {
                    var data = line.substring(1, 7);
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

    private void action(String data, WebSocketSession session) {

    }

    private Optional<String> getName(WebSocketSession session) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUri(Objects.requireNonNull(session.getUri()));
        Map<String, String> queryParams = builder.build().getQueryParams().toSingleValueMap();
        var name = queryParams.get("name");
        return name == null || name.isEmpty() ? Optional.empty() : Optional.of(name);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("Stopping communication...");
        if (future != null)
            future.cancel(true);
        if (this.portCommunicator != null) this.portCommunicator.disconnect();
    }

    public void startCommunication() {
        if (!portCommunicator.isConnected()) {
            log.warn("Puerto no conectado");
            return;
        }
        future = scheduler.scheduleAtFixedRate(() -> {
            try {
                if (this.portCommunicator == null || !this.portCommunicator.isConnected()) {
                    log.warn("Puerto no conectado");
                    return;
                }
                byte[] buffer = {80};
                portCommunicator.write(buffer);
            } catch (SerialPortException | IOException e) {
                log.error("Error al enviar", e);
            }
        }, 0, 500, TimeUnit.MILLISECONDS);
    }

    public boolean isConnected() {
        return this.portCommunicator != null && this.portCommunicator.isConnected();
    }

}
