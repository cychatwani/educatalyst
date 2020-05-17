package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class AssignmentSubmissons {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @ManyToOne()
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;
    @ManyToOne()
    @JoinColumn(name = "student_id")
    private User student;
    Date dateOfSubmission;
    Date dateOfEvaluation;
    @Column(length=10485760)
    String details;
    long obtainedPoints;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<AssignmentSubmissonFiles> files ;
    public List<AssignmentSubmissonFiles> getFiles() {
        return files;
    }

    public void setFiles(List<AssignmentSubmissonFiles> files) {
        this.files = files;
    }
    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public Date getDateOfSubmission() {
        return dateOfSubmission;
    }

    public void setDateOfSubmission(Date dateOfSubmission) {
        this.dateOfSubmission = dateOfSubmission;
    }

    public Date getDateOfEvaluation() {
        return dateOfEvaluation;
    }

    public void setDateOfEvaluation(Date dateOfEvaluation) {
        this.dateOfEvaluation = dateOfEvaluation;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public long getObtainedPoints() {
        return obtainedPoints;
    }

    public void setObtainedPoints(long obtainedPoints) {
        this.obtainedPoints = obtainedPoints;
    }
}
