package com.chinmay.service;

import com.chinmay.entity.Patient;
import com.chinmay.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private final PatientRepository patientRepository;


    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public String add(Patient patient) {
        Patient savedPatient = patientRepository.save(patient);
        if (savedPatient != null) {
            return "Patient added successfully";
        } else {
            return "Failed to add patient";
        }
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();

    }

    @Override
    public void delete(Long id) {
        patientRepository.deleteById(id);
    }

    @Override
    public Patient findbyid(Long id) {
        Optional<Patient> patientt =patientRepository.findById(id);
        return patientt.get();
    }

    @Override
    public Patient update(Long id, Patient patient) throws ChangeSetPersister.NotFoundException {
        Optional<Patient> optionalPatient = patientRepository.findById(id);

        if (optionalPatient.isPresent()) {

            Patient existingPatient = optionalPatient.get();
            existingPatient.setName(patient.getName());
            existingPatient.setLastname(patient.getLastname());
            existingPatient.setAddress(patient.getAddress());
            existingPatient.setPatientPackage(patient.getPatientPackage());
            existingPatient.setPaymentMethod(patient.getPaymentMethod());
            existingPatient.setPackageId(patient.getPackageId());
            existingPatient.setDate(patient.getDate());
            existingPatient.setMobile(patient.getMobile());

            // Step 3: Save the updated patient record
            Patient updatedPatient = patientRepository.save(existingPatient);

            // Step 4: Return the updated patient object
            return updatedPatient;
        } else {
            // Handle the case where the patient with the given ID is not found
            throw new ChangeSetPersister.NotFoundException();
        }
    }

}
