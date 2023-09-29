package com.chinmay.entity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "packagerate")
public class Packagerate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String timeperiod;
        private String amount;
        private String persessioncharges;
        private String joint;
}
