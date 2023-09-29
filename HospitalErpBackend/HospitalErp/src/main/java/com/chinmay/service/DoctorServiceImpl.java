package com.chinmay.service;

import com.chinmay.entity.Doctor;
import com.chinmay.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

    public final DoctorRepository doctorRepository;
    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public String add(Doctor doctor) {
        Doctor doctor1=doctorRepository.save(doctor);
        return "Patient added successfully";
    }
    @Override
    public Doctor getDoctorById(Long id) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
        return optionalDoctor.orElse(null);
    }
    @Override
    public List<Doctor> getAllDoctors() {
     return doctorRepository.findAll();

    }

    @Override
    public void delete(Long id) {
        doctorRepository.deleteById(id);
    }


    @Override
    public String update(Long id, Doctor updatedDoctor) {
        Optional<Doctor> existingDoctorOptional = doctorRepository.findById(id);

        if (existingDoctorOptional.isPresent()) {
            Doctor existingDoctor = existingDoctorOptional.get();
            existingDoctor.setName(updatedDoctor.getName());
            existingDoctor.setLastname(updatedDoctor.getLastname());
            existingDoctor.setAge(updatedDoctor.getAge());
            existingDoctor.setDate(updatedDoctor.getDate());
            existingDoctor.setMobileno(updatedDoctor.getMobileno());

            doctorRepository.save(existingDoctor);
        } else {
            throw new RuntimeException("Doctor not found with ID: " + id);
        }
        return null;
    }
}
