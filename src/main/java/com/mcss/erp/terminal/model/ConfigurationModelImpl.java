package com.mcss.erp.terminal.model;

import com.github.anastaciocintra.output.PrinterOutputStream;
import com.ispc.slibrary.dto.Response;
import com.mcss.erp.terminal.com.ConnectorHandler;
import com.mcss.erp.terminal.configuration.Configuration;
import com.mcss.erp.terminal.configuration.TicketConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

@Component
public class ConfigurationModelImpl implements ConfigurationModel {

    public static final String CONFIG_FILE = "configuration.properties";

    @Autowired
    Configuration configuration;

    @Autowired
    TicketConfig ticketConfig;

    @Autowired
    ConnectorHandler connectorHandler;

    @Override
    public Configuration get() {
        return this.configuration;
    }

    @Override
    public List<String> printers() {
        return Arrays.asList(PrinterOutputStream.getListPrintServicesNames());
    }

    @Override
    public Response save(Configuration configuration) {
        Response response = Response.getInstance();
        this.configuration.setPrinter(configuration.getPrinter());
        this.ticketConfig.setPrinter(configuration.getPrinter());
        Properties prop = new Properties();
        try (OutputStream out = new FileOutputStream(CONFIG_FILE)) {
            prop.setProperty("ticket.logo", this.ticketConfig.getLogoPath());
            prop.setProperty("ticket.bussinesname", this.ticketConfig.getBussinesName());
            prop.setProperty("ticket.printer", this.ticketConfig.getPrinter());
            prop.setProperty("ticket.address", this.ticketConfig.getAddress());
            prop.setProperty("ticket.taxid", this.ticketConfig.getTaxid());
            prop.setProperty("ticket.slogan", this.ticketConfig.getSlogan());
            prop.setProperty("ticket.footer", this.ticketConfig.getFooter());

            prop.setProperty("port.name", this.connectorHandler.getName());
            prop.setProperty("port.baudrate", String.valueOf(this.connectorHandler.getBaudrate()));
            prop.setProperty("port.parity", String.valueOf(this.connectorHandler.getParity()));
            prop.setProperty("port.databits", String.valueOf(this.connectorHandler.getDatabits()));
            prop.setProperty("port.stopbit", String.valueOf(this.connectorHandler.getStopbit()));
            prop.setProperty("port.stopbit", String.valueOf(this.connectorHandler.getStopbit()));
            prop.setProperty("port.host", String.valueOf(this.connectorHandler.getHost()));
            prop.setProperty("port.port", String.valueOf(this.connectorHandler.getPort()));

            prop.store(out, "Archivo de configuración del sistema");
            response.setMessage("Configuración guardada");
        } catch (IOException ex) {
            response.setCode(500);
            response.setStatus(Response.RESPONSE_NOT_OK);
            response.setMessage("Error al guardar la configuración: " + ex.getMessage());
        }
        return response;
    }

}
