package com.app.dto;

import java.util.Date;
import lombok.Data;

@Data
public class LgReportDTO {
    private Date receiveFromDate;
    private Date receiveToDate;

    private Date processedFromDate;
    private Date processedToDate;

    private String applicationStatus;
    private String customerId;
    private String customerCif;
    private String crNumber;
    private int type; //1-csv;2-pdf;3-excel
}
