package com.chinmay.service;

import com.chinmay.entity.Employee;
import com.chinmay.repository.EmployeeReposiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeReposiory employeeReposiory;

    @Override
    public String add(Employee employee) {
        employeeReposiory.save(employee);
        return "saved";
    }

    @Override
    public Employee login(String email, String password) {
        List<Employee> list = employeeReposiory.findByEmailAndPassword(email, password);
        if (list.isEmpty()) {
            throw new RuntimeException("nalle correct information tak..");
        }
        return list.get(0);
    }


}
