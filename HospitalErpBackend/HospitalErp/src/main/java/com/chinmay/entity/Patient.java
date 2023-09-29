package com.chinmay.entity;
import lombok.Data;
import javax.persistence.*;
@Entity
@Data
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastname;
    private String address;
    private String patientPackage;
    private String paymentMethod;
    private String date;
    private String packageId;
    private String mobile;

}
