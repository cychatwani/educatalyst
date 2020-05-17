package tech.educatalyst.api.Models;

import javax.persistence.*;

@Entity
public class AssignmentSubmissonFiles {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "assignment_submission_id")


    private AssignmentSubmissons assignmentSubmisson;
    private String fileUrl;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
    public AssignmentSubmissons getAssignmentSubmisson() {
        return assignmentSubmisson;
    }

    public void setAssignmentSubmisson(AssignmentSubmissons assignmentSubmisson) {
        this.assignmentSubmisson = assignmentSubmisson;
    }
}
