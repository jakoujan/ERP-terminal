package com.mcss.erp.terminal.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class CommunicatorStatus {
    private boolean connected;
    private List<String> ports;
}
