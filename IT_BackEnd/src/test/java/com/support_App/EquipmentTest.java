package com.support_App;

import com.support_App.enums.EquipmentStatus;
import com.support_App.enums.Status;
import com.support_App.enums.TypeE;
import com.support_App.model.Admin;
import com.support_App.model.Equipment;
import com.support_App.repository.EquipmentRepository;
import com.support_App.service.EquipmentService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;


@SpringBootTest
class EquipmentTest {

    @Mock
    private EquipmentRepository equipmentRepository;

    @InjectMocks
    private EquipmentService equipmentService;

    private Equipment equipment;

    @BeforeEach
    void setUp() {
        equipment = new Equipment();
        equipment.setId(1L);
        equipment.setName("Pc");
        equipment.setDescription("Dell PC");
        equipment.setEquipmentstatus(EquipmentStatus.ACTIVE);
        equipment.setPurchaseDate(LocalDate.now());
        equipment.setWarrantyEndDate(LocalDate.of(2025, 1, 1));
        equipment.setType(TypeE.LAPTOP);
        equipment.setBreakdowns(new HashSet<>());
        equipment.setSupportTickets(List.of());
    }

    @Test
    void testNoArgConstructor() {
        Equipment equipment1 = new Equipment();
        assertNotNull(equipment1);
    }

    @Test
    public void testGetters() {
        assertEquals(1L, equipment.getId());
        assertEquals("Pc", equipment.getName());
        assertEquals("Dell PC", equipment.getDescription());
        assertEquals(EquipmentStatus.ACTIVE, equipment.getEquipmentstatus());
        assertEquals(LocalDate.now(), equipment.getPurchaseDate());
    }

    @Test
    void testGetAllEquipments() {
        when(equipmentRepository.findAll()).thenReturn(List.of(equipment));
        List<Equipment> result = equipmentService.getAllEquipments();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(equipment.getId(), result.get(0).getId());
        verify(equipmentRepository, times(1)).findAll();
    }

    	@Test
	void testSaveEquipment() {
		when(equipmentRepository.save(any(Equipment.class))).thenAnswer(invocation -> {
			Equipment saveEquipment = invocation.getArgument(0);
			if (saveEquipment.getId() == null) {
                saveEquipment.setId(1L);
			}
			return saveEquipment;
		});
		Equipment equipment1 = new Equipment();
		Equipment equipment2 = equipmentService.addEquipment(equipment1);
		assertNotNull(equipment2);
		assertEquals(1L, equipment2.getId());
	}
    @Test
    void testUpdateEquipment() {
        when(equipmentRepository.findById(1L)).thenReturn(Optional.of(equipment));
        when(equipmentRepository.save(any(Equipment.class))).thenReturn(equipment);

        Equipment updatedEquipment = new Equipment();
        updatedEquipment.setName("Updated Pc");
        updatedEquipment.setDescription("Updated Dell PC");

        Equipment result = equipmentService.updateEquipment(1L, updatedEquipment);
        assertNotNull(result);
        assertEquals("Updated Pc", result.getName());
        assertEquals("Updated Dell PC", result.getDescription());
        verify(equipmentRepository, times(1)).findById(1L);
        verify(equipmentRepository, times(1)).save(equipment);
    }

    @Test
    void testDeleteEquipment() {
        when(equipmentRepository.findById(1L)).thenReturn(Optional.of(equipment));

        equipmentService.deleteEquipment(1L);
        verify(equipmentRepository, times(1)).findById(1L);
        verify(equipmentRepository, times(1)).delete(equipment);
    }

    @Test
    void testGetEquipmentById() {
        when(equipmentRepository.findById(1L)).thenReturn(Optional.of(equipment));

        Optional<Equipment> result = equipmentService.getEquipmentById(1L);
        assertNotNull(result);
        Assertions.assertTrue(result.isPresent());
        assertEquals("Pc", result.get().getName());
        verify(equipmentRepository, times(1)).findById(1L);
    }

}


