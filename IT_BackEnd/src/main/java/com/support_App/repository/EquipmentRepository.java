package com.support_App.repository;

import com.support_App.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface EquipmentRepository extends JpaRepository<Equipment , Long> {
}
