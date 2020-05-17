package tech.educatalyst.api.Models.DataTransferObjects;

import tech.educatalyst.api.Models.AssignmentSubmissons;

public class EvaluationDto {
    private long submissonId;
    private long points;
    public long getSubmissonId() {
        return submissonId;
    }

    public void setSubmissonId(long submissonId) {
        this.submissonId = submissonId;
    }

    public long getPoints() {
        return points;
    }

    public void setPoints(long points) {
        this.points = points;
    }
}
