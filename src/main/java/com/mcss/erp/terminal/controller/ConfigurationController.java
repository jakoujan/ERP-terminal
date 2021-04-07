/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.controller;

import com.ispc.slibrary.dto.Response;
import com.mcss.erp.terminal.configuration.Configuration;
import com.mcss.erp.terminal.model.ConfigurationModel;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/pos/configuration/")
public class ConfigurationController {
    
    @Autowired
    ConfigurationModel configurationModel;
    
    @GetMapping(value = "")
    public Configuration get(){
        return this.configurationModel.get();
    }
    
    @GetMapping(value = "printers")
    public List<String> printers(){
        return this.configurationModel.printers();
    }
    
    @PostMapping(value="save")
    public Response save(@RequestBody Configuration configuration){
        return this.configurationModel.save(configuration);
    }
}

