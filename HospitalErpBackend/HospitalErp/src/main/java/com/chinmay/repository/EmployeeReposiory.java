package com.chinmay.repository;

import com.chinmay.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeReposiory extends JpaRepository<Employee, Integer> {
    public List<Employee> findByEmailAndPassword(String email,String password);
}
