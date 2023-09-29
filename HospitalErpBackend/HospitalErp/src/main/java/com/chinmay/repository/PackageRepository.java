package com.chinmay.repository;
import com.chinmay.entity.Packagerate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageRepository extends JpaRepository<Packagerate, Long> {

}
