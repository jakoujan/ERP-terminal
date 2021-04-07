/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mcss.erp.terminal.dto;

/**
 *
 * @author edgar
 */
public class Configurator implements java.io.Serializable {

    private String topic;

    public Configurator() {
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    @Override
    public String toString() {
        return "Configurator{" + "topic=" + topic + '}';
    }

}
