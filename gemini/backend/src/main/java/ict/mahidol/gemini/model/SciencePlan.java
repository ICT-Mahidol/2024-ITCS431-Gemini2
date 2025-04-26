package ict.mahidol.gemini.model;

import java.util.Date;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "`science_plan`")
public class SciencePlan {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    protected int planId;
    protected String planName;
    protected String creator;
    protected String submitter;
    protected double funding;
    protected String objective;
    protected String starSystem;
    protected Date startDate;
    protected Date endDate;
    protected String telescopeLocation;
    protected String planStatus;
    @Embedded
    protected DataProcessingRequirement dataProcessingReq;

    public SciencePlan()
    {
        super();
    }

    public SciencePlan(int planId, String planName, String creator, String submitter, double funding,
                       String objective, String starSystem, Date startDate, Date endDate,
                       String telescopeLocation, String planStatus, DataProcessingRequirement dataProcessingReq) {
        this.planId = planId;
        this.planName = planName;
        this.creator = creator;
        this.submitter = submitter;
        this.funding = funding;
        this.objective = objective;
        this.starSystem = starSystem;
        this.startDate = startDate;
        this.endDate = endDate;
        this.telescopeLocation = telescopeLocation;
        this.planStatus = planStatus;
        this.dataProcessingReq = dataProcessingReq;
    }

    public int getPlanId() {
        return planId;
    }

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

    public DataProcessingRequirement getDataProcessingReq()
    {
        return dataProcessingReq;
    }

    public void setSubmitter(String submitter) {
        this.submitter = submitter;
    }

    public void setPlanStatus(String planStatus) {
        this.planStatus = planStatus;
    }
}
