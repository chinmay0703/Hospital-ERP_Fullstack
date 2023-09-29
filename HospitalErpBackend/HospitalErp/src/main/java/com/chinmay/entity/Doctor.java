package com.chinmay.entity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "Doctor")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastname;
    private String age;
    private String adharcard;
    private String mobileno;
    private String date;
}
