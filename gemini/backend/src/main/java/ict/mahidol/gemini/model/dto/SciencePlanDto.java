package ict.mahidol.gemini.model.dto;

import java.util.Date;
import ict.mahidol.gemini.model.DataProcessingRequirement;

public class SciencePlanDto {
    private String planName;
    private String creator;
    private String submitter;
    private double funding = -1;
    private String objective;
    private String starSystem;
    private Date startDate;
    private Date endDate;
    private String telescopeLocation;
    private String planStatus;
    private DataProcessingRequirement dataProcessingReq;

    // Getters
    public String getPlanName() {
        return planName;
    }

    public String getCreator() {
        return creator;
    }

    public String getSubmitter() {
        return submitter;
    }

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

    public DataProcessingRequirement getDataProcessingReq() {
        return dataProcessingReq;
    }

    // Setters
    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public void setSubmitter(String submitter) {
        this.submitter = submitter;
    }

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

    public void setDataProcessingReq(DataProcessingRequirement dataProcessingReq) {
        this.dataProcessingReq = dataProcessingReq;
    }
}
