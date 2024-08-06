//package com.support_App.service;
//
//
//import com.support_App.model.Equipment;
//import com.support_App.repository.EquipmentRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class EquipmentService {
//
//    @Autowired
//    private EquipmentRepository equipmentRepository ;
//
//    public List<Equipment> findAll(){
//        return equipmentRepository.findAll();
//    }
//
//    public Equipment save(Equipment equipment){
//        return equipmentRepository.save(equipment);
//    }
//
//    public Equipment getEquipmentBydId(Long id){
//        return equipmentRepository.findById(id).orElseThrow(() -> new
//                RuntimeException("Equipment nor found: " + id));
//    }
//
//    public void deleteEquipment(Long id){
//        equipmentRepository.deleteById(id);
//    }
//
//    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
//        Equipment existingEquipment = equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found: " + id));
//        existingEquipment.setName(updatedEquipment.getName());
//        existingEquipment.setDescription(updatedEquipment.getDescription());
//        existingEquipment.setEquipmentstatus(updatedEquipment.getEquipmentstatus());
//        existingEquipment.setPurchaseDate(updatedEquipment.getPurchaseDate());
//        existingEquipment.setWarrantyEndDate(updatedEquipment.getWarrantyEndDate());
//        existingEquipment.setType(updatedEquipment.getType());
//            return equipmentRepository.save(existingEquipment);
//    }
//}
package com.support_App.service;

import com.support_App.model.Equipment;
import com.support_App.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public Equipment addEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipment(Long id, Equipment equipmentDetails) {
        Equipment equipment = equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));

        equipment.setName(equipmentDetails.getName());
        equipment.setDescription(equipmentDetails.getDescription());
        equipment.setEquipmentstatus(equipmentDetails.getEquipmentstatus());
        equipment.setPurchaseDate(equipmentDetails.getPurchaseDate());
        equipment.setWarrantyEndDate(equipmentDetails.getWarrantyEndDate());
        equipment.setType(equipmentDetails.getType());

        return equipmentRepository.save(equipment);
    }

    public void deleteEquipment(Long id) {
        Equipment equipment = equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));
        equipmentRepository.delete(equipment);
    }
    public Optional<Equipment> getEquipmentById(Long id) {
        Equipment equipment = equipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Equipment not found"));
         return equipmentRepository.findById(id);
    }

    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }
}
