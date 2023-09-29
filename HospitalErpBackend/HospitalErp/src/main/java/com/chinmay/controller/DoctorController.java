package com.chinmay.controller;
import com.chinmay.entity.Doctor;
import com.chinmay.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/doctor")
@RestController
public class DoctorController {
    @Autowired
    DoctorService servicee;
    @PostMapping(value = "/save", consumes = {"application/json"})
    public ResponseEntity<String> save(@RequestBody Doctor doctor) {
        String msg = servicee.add(doctor);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
    @GetMapping(value = "/get", produces = "application/json")
    public List<Doctor> findAllDoctors() {
        return servicee.getAllDoctors();
    }
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id)
    {
        servicee.delete(id);
        return new ResponseEntity<>("Patient Deleted", HttpStatus.OK);
    }
    @PutMapping(value = "/update/{id}", consumes = "application/json")
    public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody Doctor doctor) {
        String msg = servicee.update(id, doctor);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
    @GetMapping("/getById/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") Long id) {
        Doctor doctor = servicee.getDoctorById(id);
        if (doctor != null) {
            return new ResponseEntity<>(doctor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if doctor not found
        }
    }


}
