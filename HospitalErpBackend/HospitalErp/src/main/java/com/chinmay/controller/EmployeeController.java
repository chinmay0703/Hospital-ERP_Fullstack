package com.chinmay.controller;
import com.chinmay.entity.Employee;
import com.chinmay.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
@RestController
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping(value = "/save", consumes = {"application/json"})
    public ResponseEntity<String> save(@RequestBody Employee employee) {
        String msg = employeeService.add(employee);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<Employee> login(@RequestParam("email") String email, @RequestParam("password") String password) {
        Employee msg = employeeService.login(email, password);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
}
