package com.chinmay.controller;
import com.chinmay.entity.Packagerate;
import com.chinmay.service.PackagerateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/package")
@RestController
public class PackageController {

    @Autowired
    private PackagerateService service;

    @PostMapping(value = "/save", consumes = {"application/json"})
    public ResponseEntity<String> save(@RequestBody Packagerate packagerate) {
        String msg = service.add(packagerate);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
    @GetMapping(value = "/get", produces = "application/json")
    public List<Packagerate> findAllPatients() {
        return service.getAllPackages();
    }
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id)
    {
        service.delete(id);
        return new ResponseEntity<>("package Deleted", HttpStatus.OK);
    }

    @GetMapping("/getById")
    public ResponseEntity<Packagerate> getById(@RequestParam("id") Long id) {
        Packagerate packagerate=service.findbyId(id);
        return new ResponseEntity<>(packagerate,HttpStatus.OK);

    }



}
