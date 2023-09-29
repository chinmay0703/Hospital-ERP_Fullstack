package com.chinmay.service;


import com.chinmay.entity.Patient;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PatientService {
    public String add(Patient patient);
    public List<Patient> getAllPatients();

    public void delete(Long id);

    public Patient findbyid(Long id);

    public Patient update(Long id,Patient patient) throws ChangeSetPersister.NotFoundException;


}
