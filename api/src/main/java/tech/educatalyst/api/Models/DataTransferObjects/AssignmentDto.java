package tech.educatalyst.api.Models.DataTransferObjects;

import tech.educatalyst.api.Models.Course;

import java.util.Date;

public class AssignmentDto {
    private String courseKey;
    Date dateOpened;
    Date submissionDeadline;
    private String assignmentDescription;
    private String tittle;
    private long  maxPoints;
    private String assignmentFileUrl;

    public String getCourseKey() {
        return courseKey;
    }

    public void setCourseKey(String courseKey) {
        this.courseKey = courseKey;
    }

    public Date getDateOpened() {
        return dateOpened;
    }

    public void setDateOpened(Date dateOpened) {
        this.dateOpened = dateOpened;
    }

    public Date getSubmissionDeadline() {
        return submissionDeadline;
    }

    public void setSubmissionDeadline(Date submissionDeadline) {
        this.submissionDeadline = submissionDeadline;
    }

    public String getAssignmentDescription() {
        return assignmentDescription;
    }

    public void setAssignmentDescription(String assignmentDescription) {
        this.assignmentDescription = assignmentDescription;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public long getMaxPoints() {
        return maxPoints;
    }

    public void setMaxPoints(long maxPoints) {
        this.maxPoints = maxPoints;
    }

    public String getAssignmentFileUrl() {
        return assignmentFileUrl;
    }

    public void setAssignmentFileUrl(String assignmentFileUrl) {
        this.assignmentFileUrl = assignmentFileUrl;
    }
}
