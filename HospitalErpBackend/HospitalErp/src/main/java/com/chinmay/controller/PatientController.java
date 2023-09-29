package com.chinmay.controller;
import com.chinmay.entity.Patient;
import com.chinmay.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/patient")
@RestController
public class PatientController {

    @Autowired
  private PatientService service;

    @PostMapping(value = "/save", consumes = {"application/json"})
    public ResponseEntity<String> save(@RequestBody Patient patient) {
        String msg = service.add(patient);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
    @GetMapping(value = "/get", produces = "application/json")
    public List<Patient> findAllPatients() {
        return service.getAllPatients();
    }
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id)
    {
        service.delete(id);
        return new ResponseEntity<>("Patient Deleted", HttpStatus.OK);
    }
    @GetMapping("/getById/{id}") // Change the mapping to accept a path variable
    public ResponseEntity<Patient> getById(@PathVariable("id") Long id) {
        Patient patient = service.findbyid(id);
        if (patient != null) {
            return new ResponseEntity<>(patient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if patient not found
        }
    }

    @PutMapping(value = "/update/{id}", consumes = "application/json")
    public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody Patient patient) throws ChangeSetPersister.NotFoundException {
        String msg = String.valueOf(service.update(id, patient));
        if (msg != null) {
            return new ResponseEntity<>(msg, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
        }
    }






}
