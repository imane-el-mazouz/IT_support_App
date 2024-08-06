package com.support_App.service;


import com.support_App.model.Equipment;
import com.support_App.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository ;

    public List<Equipment> findAll(){
        return equipmentRepository.findAll();
    }

    public Equipment save(Equipment equipment){
        return equipmentRepository.save(equipment);
    }

    public Equipment getEquipmentBydId(Long id){
        return equipmentRepository.findById(id).orElseThrow(() -> new
                RuntimeException("Equipment nor found: " + id));
    }

    public void deleteEquipment(Long id){
        equipmentRepository.deleteById(id);
    }

    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
        Equipment existingEquipment = equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found: " + id));
        existingEquipment.setName(updatedEquipment.getName());
        existingEquipment.setDescription(updatedEquipment.getDescription());
        existingEquipment.setEquipmentstatus(updatedEquipment.getEquipmentstatus());
        existingEquipment.setPurchaseDate(updatedEquipment.getPurchaseDate());
        existingEquipment.setWarrantyEndDate(updatedEquipment.getWarrantyEndDate());
        existingEquipment.setType(updatedEquipment.getType());
        existingEquipment.setAdmin(updatedEquipment.getAdmin());
            return equipmentRepository.save(existingEquipment);
    }
}
