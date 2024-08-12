package com.support_App.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.support_App.enums.EquipmentStatus;
import jakarta.persistence.*;
import com.support_App.enums.Status;
import com.support_App.enums.TypeE;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;


    private LocalDate purchaseDate;
    private LocalDate warrantyEndDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 225)
    private TypeE type;

    @Enumerated(EnumType.STRING)
    @Column(name = "Equipmentstatus", nullable = false, length = 225)
    private EquipmentStatus Equipmentstatus;



//    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonBackReference
//    @JsonIgnore
//    private Admin admin;

//    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    @JsonIgnore
//    private List<Breakdown> breakdowns;



    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
    @JsonIgnore
    private List<SupportTicket> supportTickets;

    @ManyToMany(mappedBy = "equipments" , cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Breakdown> breakdowns = new HashSet<>();


}
