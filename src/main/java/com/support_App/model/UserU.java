package com.support_App.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
@DiscriminatorValue("UserU")

public class UserU extends User{
    @OneToMany(mappedBy = "userU", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JsonIgnore
    private List<SupportTicket> supportTickets;

    @OneToMany(mappedBy = "userU", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JsonIgnore
    private List<Breakdown> breakdowns;


}
