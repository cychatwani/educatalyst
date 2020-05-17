package tech.educatalyst.api.Models.DataTransferObjects;

import java.util.List;

public class AssigenmentSubmissonDTO {
    private String description;
    private List<String> filePaths;
    private long assignmentId;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getFilePaths() {
        return filePaths;
    }

    public void setFilePaths(List<String> filePaths) {
        this.filePaths = filePaths;
    }

    public long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(long assignmentId) {
        this.assignmentId = assignmentId;
    }
}
