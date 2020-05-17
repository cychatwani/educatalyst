package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Assignment{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @ManyToOne()
    @JoinColumn(name = "course_id")
    private Course course;
    Date dateOpened;
    Date submissionDeadline;
    @Column(length=10485760)
    private String assignmentDescription;
    private String tittle;
    private long  maxPoints;
    private String assignmentFileUrl;


    public String getAssignmentFileUrl() {
        return assignmentFileUrl;
    }

    public void setAssignmentFileUrl(String assignmentFileUrl) {
        this.assignmentFileUrl = assignmentFileUrl;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
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
}
