package com.hanzama.mental_health_app.repository;

import com.hanzama.mental_health_app.entity.CopingTool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CopingToolRepository extends JpaRepository<CopingTool, Long> {
    
}
