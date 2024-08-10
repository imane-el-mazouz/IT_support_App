package com.support_App.repository;

import com.support_App.enums.Role;
import com.support_App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    List<User> findByRole(Role role);
    User findByEmail(String email);
}


