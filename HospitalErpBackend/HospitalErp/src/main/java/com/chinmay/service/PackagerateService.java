package com.chinmay.service;
import com.chinmay.entity.Doctor;
import com.chinmay.entity.Packagerate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PackagerateService {
    public String add(Packagerate packagerate);
    public List<Packagerate> getAllPackages();
    public void delete(Long id);
    public Packagerate findbyId(Long id);

}
