package com.app.entity;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "lg_product")
public class LgProduct extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lg_reference")
    private String lgReference;

    @Column(name = "issue_date")
    private Date issueDate;

    @Column(name = "sadad_id")
    private String sadadId;

    @Column(name = "beneficiary_uid")
    private String beneficiaryUid;

    @Column(name = "beneficiary_name")
    private String beneficiaryName;
    @Column(name = "beneficiary_iban")
    private String beneficiaryIban;

    @Column(name = "bank_fee_iban")
    private String bankFeeIban;

    @Column(name = "existing_lg_amount")
    private Double existingLgAmount;

    @Column(name = "existing_lg_validity_date")
    private Date existingLgvalidityDate;

    @Column(name = "applicant_id")
    private String applicantId;

    @Column(name = "applicant_cif")
    private String applicantCif;

    @Column(name = "applicant_name")
    private String applicantName;

    @Column(name = "applicant_cr")
    private String applicantCr;

    @Column(name = "applicant_iban")
    private String applicantIban;

    @Column(name = "requester_type")
    private String requesterType;

    @Column(name = "special_account_iban")
    private String specialAccountIban;

    @Column(name = "amendment_amount")
    private Double amendmentAmount;

    @Column(name = "amendment_lg_validity_date")
    private Date amendmentLgValidityDate;

    @Column(name = "amendment_term_condition")
    private String amendmentTermCondition;


    @Column(name = "validation_time")
    private Date validationTime;

    @Column(name = "validation_status")
    private String validationStatus;

    @Column(name = "reason_failure")
    private String reasonFailure;

}
