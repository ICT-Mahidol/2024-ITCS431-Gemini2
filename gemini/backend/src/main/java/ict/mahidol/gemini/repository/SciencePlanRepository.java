package ict.mahidol.gemini.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ict.mahidol.gemini.model.SciencePlan;

public interface SciencePlanRepository extends CrudRepository<SciencePlan, Integer> {
    
    public List<SciencePlan> findByPlanStatus(String planStatus);
}
