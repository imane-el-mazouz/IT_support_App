package com.support_App.repository;

import com.support_App.model.Breakdown;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreakdownRepository extends JpaRepository<Breakdown , Long> {

//      List<Breakdown> findByEquipmentsId(Long equipmentId);
      @Query("SELECT b FROM Breakdown b JOIN b.equipments e WHERE e.id = :equipmentId")
      List<Breakdown> findBreakdownsByEquipmentId(Long equipmentId);


}
