/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.print;

import com.mcss.erp.terminal.data.entity.SaleOrder;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 *
 * @author edgar
 */
public interface PrintJob {

    public void print(SaleOrder order) throws FileNotFoundException, IOException;
}
