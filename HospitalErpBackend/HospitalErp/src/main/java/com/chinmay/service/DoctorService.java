package com.chinmay.service;
import com.chinmay.entity.Doctor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DoctorService {
    public String add(Doctor doctor);
    public List<Doctor> getAllDoctors();
    public void delete(Long id);
    public String update(Long id, Doctor doctor);
    public Doctor getDoctorById(Long id);
}
