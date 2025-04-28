package ict.mahidol.gemini.model.dto;

import java.util.Date;

public class SciencePlanDto {
    private double funding = -1;
    private String objective;
    private String starSystem;
    private Date startDate;
    private Date endDate;
    private String telescopeLocation;
    private String planStatus;
    private DataProcessingRequirementDto dataProcessingReq;

    // Getters
    public double getFunding() {
        return funding;
    }

    public String getObjective() {
        return objective;
    }

    public String getStarSystem() {
        return starSystem;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public String getTelescopeLocation() {
        return telescopeLocation;
    }

    public String getPlanStatus() {
        return planStatus;
    }

    public DataProcessingRequirementDto getDataProcessingReq() {
        return dataProcessingReq;
    }

    // Setters
    public void setFunding(double funding) {
        this.funding = funding;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public void setStarSystem(String starSystem) {
        this.starSystem = starSystem;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setTelescopeLocation(String telescopeLocation) {
        this.telescopeLocation = telescopeLocation;
    }

    public void setPlanStatus(String planStatus) {
        this.planStatus = planStatus;
    }

    public void setDataProcessingReq(DataProcessingRequirementDto dataProcessingReq) {
        this.dataProcessingReq = dataProcessingReq;
    }
}
