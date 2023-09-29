package com.chinmay.service;

import com.chinmay.entity.Employee;
import org.springframework.stereotype.Service;

@Service
public interface EmployeeService {
    public String add(Employee employee);
    public Employee login(String email,String password);

}
