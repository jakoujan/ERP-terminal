/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.model;

import com.ispc.slibrary.dto.Response;
import com.mcss.erp.terminal.configuration.Configuration;
import java.util.List;

/**
 *
 * @author edgar
 */
public interface ConfigurationModel {

    public Configuration get();

    public List<String> printers();

    public Response save(Configuration configuration);
    
}
