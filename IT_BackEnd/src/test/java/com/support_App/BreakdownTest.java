package com.support_App;

import com.support_App.enums.RepairStatus;
import com.support_App.model.Breakdown;
import com.support_App.model.Equipment;
import com.support_App.repository.BreakdownRepository;
import com.support_App.repository.EquipmentRepository;
import com.support_App.service.BreakdownService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class BreakdownTest {

    @Autowired
    private BreakdownService breakdownService;

    @Autowired
    private BreakdownRepository breakdownRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    private Breakdown breakdown;
    private Equipment equipment;

    @BeforeEach
    void setUp() {
        equipment = new Equipment();
        equipment.setId(1L);
        equipmentRepository.save(equipment);

        breakdown = new Breakdown();
        breakdown.setDescription("Test Description");
        breakdown.setReportedDate(LocalDate.now());
        breakdown.setRepairStatus(RepairStatus.Reported);
        breakdown.setEquipments(new HashSet<>());
    }

    @Test
    void testAddBreakdown() {
        Breakdown savedBreakdown = breakdownService.addBreakdown(breakdown);
        assertNotNull(savedBreakdown.getId());
        assertEquals("Test Description", savedBreakdown.getDescription());
    }

    @Test
    void testUpdateBreakdown() {
        Breakdown savedBreakdown = breakdownService.addBreakdown(breakdown);
        savedBreakdown.setDescription("Updated Description");
        Breakdown updatedBreakdown = breakdownService.updateBreakdown(savedBreakdown.getId(), savedBreakdown);
        assertEquals("Updated Description", updatedBreakdown.getDescription());
    }

    @Test
    void testDeleteBreakdown() {
        Breakdown savedBreakdown = breakdownService.addBreakdown(breakdown);
        breakdownService.deleteBreakdown(savedBreakdown.getId());
        assertThrows(RuntimeException.class, () -> breakdownRepository.findById(savedBreakdown.getId()).orElseThrow(() -> new RuntimeException("Breakdown not found")));
    }

//    @Test
//    void testAddBreakdownToEquipment() {
//        Breakdown savedBreakdown = breakdownService.addBreakdown(breakdown);
//        Breakdown updatedBreakdown = breakdownService.addBreakdownToEquipment(equipment.getId(), savedBreakdown);
//        assertNotNull(updatedBreakdown);
//        assertTrue(updatedBreakdown.getEquipments().contains(equipment));
//    }
//    @Test
//    void testGetBreakdownsByEquipmentId() {
//        Breakdown savedBreakdown = breakdownService.addBreakdown(breakdown);
//        breakdownService.addBreakdownToEquipment(equipment.getId(), savedBreakdown);
//        List<Breakdown> breakdowns = breakdownService.getBreakdownsByEquipmentId(equipment.getId());
//        assertNotNull(breakdowns);
//        assertFalse(breakdowns.isEmpty());
//        assertTrue(breakdowns.contains(savedBreakdown));
//    }

}
