package com.chinmay.service;
import com.chinmay.entity.Packagerate;
import com.chinmay.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PackagerateServiceImpl implements PackagerateService {


    @Autowired
    private final PackageRepository packageRepository;

    public PackagerateServiceImpl(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }


    @Override
    public String add(Packagerate packagerate) {
        Packagerate pack=packageRepository.save(packagerate);
        return "Package added ";
    }

    @Override
    public List<Packagerate> getAllPackages() {
        return packageRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        packageRepository.deleteById(id);

    }

    @Override
    public Packagerate findbyId(Long id) {
        Optional<Packagerate> packagerate=packageRepository.findById(id);
        return packagerate.get();
    }
}
