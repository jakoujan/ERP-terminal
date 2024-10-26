package com.mcss.erp.terminal.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
public class Configuration {

    @Value("${ticket.printer}")
    private String printer;
    @Value("${application.host}")
    private String host;
    @Value("${application.name}")
    private String name;
    @Value("${application.sale.paid:false}")
    private Boolean paid;
}
