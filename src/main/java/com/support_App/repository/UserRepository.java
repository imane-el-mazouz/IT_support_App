package com.support_App.repository;

import com.support_App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    public User findByEmail(String email);
}


