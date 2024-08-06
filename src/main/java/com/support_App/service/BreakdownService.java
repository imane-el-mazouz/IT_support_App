package com.support_App.service;

import com.support_App.enums.RepairStatus;
import com.support_App.exception.BreakdownNotFoundException;
import com.support_App.exception.EquipmentNotFoundException;
import com.support_App.exception.UserNotFoundException;
import com.support_App.model.Breakdown;
import com.support_App.model.Equipment;
import com.support_App.model.User;
import com.support_App.model.UserU;
import com.support_App.repository.BreakdownRepository;
import com.support_App.repository.EquipmentRepository;
import com.support_App.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BreakdownService {

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
@Autowired
private BreakdownRepository breakdownRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    public Breakdown addBreakdown(Breakdown breakdown, List<Long> equipmentIds) {
        Set<Equipment> equipments = new HashSet<>();
        for (Long id : equipmentIds) {
            Equipment equipment = equipmentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Equipment not found"));
            equipments.add(equipment);
        }
        breakdown.setEquipments(equipments);
        return breakdownRepository.save(breakdown);
    }

    public void deleteBreakdown(Long id) {
        breakdownRepository.deleteById(id);
    }

    public List<Breakdown> getBreakdownsByEquipmentId(Long equipmentId) {
        return breakdownRepository.findByEquipments_Id(equipmentId);
    }
}