package com.support_App.repository;

import com.support_App.model.Breakdown;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BreakdownRepository extends JpaRepository<Breakdown , Long> {

}
