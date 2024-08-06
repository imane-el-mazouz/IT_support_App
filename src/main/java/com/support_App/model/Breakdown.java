package com.support_App.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.support_App.enums.RepairStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Breakdown {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDate reportedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "repairStatus", nullable = false, length = 225)
    private RepairStatus repairStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JsonIgnore
    private Admin admin;

//    @Setter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonBackReference
//    @JsonIgnore
//    private UserU userU;

    @ManyToMany
    @JsonIgnore
    @JsonBackReference
    @JoinTable(
            name = "breakdown_equipment",
            joinColumns = @JoinColumn(name = "breakdown_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id")
    )
    private Set<Equipment> equipments = new HashSet<>();


//    public void assignToAdmin(Admin admin) {
//        this.admin = admin;
//        this.repairStatus = RepairStatus.Inprogress;
//    }
//
//    public void completeRepair() {
//        this.repairStatus = RepairStatus.Reported;
//    }

}
