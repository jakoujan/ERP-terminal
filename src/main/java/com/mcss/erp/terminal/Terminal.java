package com.mcss.erp.terminal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(encoding = "UTF-8", value = {"file:configuration.properties"})
public class Terminal {

    public static void main(String[] args) {
        SpringApplication.run(Terminal.class, args);
    }

}
