package com.support_App.service;

import com.support_App.model.Breakdown;
import com.support_App.repository.BreakdownRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BreakdownService {

    @Autowired
    private BreakdownRepository breakdownRepository;
    public List<Breakdown> findAll(){
        return breakdownRepository.findAll();
    }




}
