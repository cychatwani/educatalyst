package tech.educatalyst.api.Models.ApiModels;

import tech.educatalyst.api.Models.Assignment;

import java.util.List;

public class StudentCourseAssingmentResponce {
    List<Assignment> pendingAssignments;
    List<Assignment> submittedAssignments;

    public List<Assignment> getPendingAssignments() {
        return pendingAssignments;
    }

    public void setPendingAssignments(List<Assignment> pendingAssignments) {
        this.pendingAssignments = pendingAssignments;
    }

    public List<Assignment> getSubmittedAssignments() {
        return submittedAssignments;
    }

    public void setSubmittedAssignments(List<Assignment> submittedAssignments) {
        this.submittedAssignments = submittedAssignments;
    }
}
