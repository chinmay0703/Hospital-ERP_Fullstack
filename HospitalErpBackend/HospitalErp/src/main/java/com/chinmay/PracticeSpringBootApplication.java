package com.chinmay;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@SpringBootApplication
@ComponentScan(basePackages = "com.chinmay")
public class PracticeSpringBootApplication {
	public static void main(String[] args) {
		SpringApplication.run(PracticeSpringBootApplication.class, args);
	}
}
