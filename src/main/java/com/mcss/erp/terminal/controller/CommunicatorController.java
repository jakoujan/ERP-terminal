package com.mcss.erp.terminal.controller;

import com.mcss.erp.terminal.dto.CommunicatorStatus;
import com.mcss.erp.terminal.model.CommunicatorModel;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/pos/communicator")
public class CommunicatorController {

    CommunicatorModel model;

    @GetMapping()
    public CommunicatorStatus status() {
        return this.model.checkStatus();
    }
}
