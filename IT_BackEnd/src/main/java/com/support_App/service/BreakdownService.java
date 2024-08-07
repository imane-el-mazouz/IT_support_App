

//    @Autowired
//    private BreakdownRepository breakdownRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private EquipmentRepository equipmentRepository;
//
//    public List<Breakdown> findAll() {
//        return breakdownRepository.findAll();
//    }
//
//    public Breakdown reportBreakdown(Long userId, Long equipmentId, String description) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
//        Equipment equipment = equipmentRepository.findById(equipmentId)
//                .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with id: " + equipmentId));
//
//        if (!(user instanceof UserU)) {
//            throw new IllegalArgumentException("User is not of type UserU");
//        }
//
//        Breakdown breakdown = new Breakdown();
//        breakdown.setUserU((UserU) user);
//        breakdown.setEquipment(equipment);
//        breakdown.setDescription(description);
//        breakdown.setReportedDate(LocalDate.now());
//        breakdown.setRepairStatus(RepairStatus.Reported);
//
//        return breakdownRepository.save(breakdown);
//    }
//
//
//    public Breakdown updateStatus(Long breakdownId, RepairStatus newStatus) {
//        Breakdown breakdown = breakdownRepository.findById(breakdownId)
//                .orElseThrow(() -> new BreakdownNotFoundException("Breakdown not found with id: " + breakdownId));
//        breakdown.setRepairStatus(newStatus);
//        return breakdownRepository.save(breakdown);
//    }
//
//    public List<Breakdown> findByEquipment(Long equipmentId) {
//        return breakdownRepository.findByEquipmentId(equipmentId);
//    }
package com.support_App.service;

import com.support_App.model.Breakdown;
import com.support_App.model.Equipment;
import com.support_App.repository.BreakdownRepository;
import com.support_App.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

    @Service
    public class BreakdownService {

        @Autowired
        private BreakdownRepository breakdownRepository;

        @Autowired
        private EquipmentRepository equipmentRepository;

        public Breakdown addBreakdown(Breakdown breakdown) {
            return breakdownRepository.save(breakdown);
        }

        public Breakdown updateBreakdown(Long id, Breakdown breakdownDetails) {
            Breakdown breakdown = breakdownRepository.findById(id).orElseThrow(() -> new RuntimeException("Breakdown not found"));

            breakdown.setDescription(breakdownDetails.getDescription());
            breakdown.setReportedDate(breakdownDetails.getReportedDate());
            breakdown.setRepairStatus(breakdownDetails.getRepairStatus());

            return breakdownRepository.save(breakdown);
        }

        public void deleteBreakdown(Long id) {
            Breakdown breakdown = breakdownRepository.findById(id).orElseThrow(() -> new RuntimeException("Breakdown not found"));
            breakdownRepository.delete(breakdown);
        }

        public Breakdown addBreakdownToEquipment(Long equipmentId, Breakdown breakdown) {
            Equipment equipment = equipmentRepository.findById(equipmentId)
                    .orElseThrow(() -> new RuntimeException("Equipment not found with id: " + equipmentId));

            breakdown.getEquipments().add(equipment);
            return breakdownRepository.save(breakdown);
        }

//        public List<Breakdown> getBreakdownsByEquipmentId(Long equipmentId) {
//            return breakdownRepository.findBreakdownsByEquipmentId(equipmentId);
//        }
public List<Breakdown> getBreakdownsByEquipmentId(Long equipmentId) {
    return breakdownRepository.findBreakdownsByEquipmentId(equipmentId);
}

    }
