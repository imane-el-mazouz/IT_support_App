//package com.support_App.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import com.fasterxml.jackson.annotation.JsonSubTypes;
//import com.fasterxml.jackson.annotation.JsonTypeInfo;
//import com.support_App.enums.Role;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.List;
//
//
//@Getter
//@Setter
//@AllArgsConstructor
//@Inheritance(strategy = InheritanceType.JOINED)
//@Entity
//@DiscriminatorColumn(name = "user_type")
//
////@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
////@JsonSubTypes({
////        @JsonSubTypes.Type(value = Technician.class, name = "Technician"),
////        @JsonSubTypes.Type(value = UserU.class, name = "UserU"),
////        @JsonSubTypes.Type(value = Admin.class, name = "Admin")
////})
//@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "role")
//@JsonSubTypes({
//        @JsonSubTypes.Type(value = Technician.class, name = "Technician"),
//        @JsonSubTypes.Type(value = UserU.class, name = "UserU"),
//        @JsonSubTypes.Type(value = Admin.class, name = "Admin")
//})
//public abstract class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//    private String email;
//    private String password;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "role", nullable = false, length = 225)
//    private Role role;
//
//
//    public User() {
//
//    }
//}
package com.support_App.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.support_App.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "role")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Admin.class, name = "Admin"),
        @JsonSubTypes.Type(value = Technician.class, name = "Technician"),
        @JsonSubTypes.Type(value = UserU.class, name = "UserU")
})
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 225)
    private Role role;

    public User() {
    }
}
