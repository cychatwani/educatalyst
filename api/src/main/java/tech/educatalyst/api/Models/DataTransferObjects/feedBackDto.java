package tech.educatalyst.api.Models.DataTransferObjects;

public class feedBackDto {
    private long lectureId;
    private short ratings;
    private String comment;

    public long getLectureId() {
        return lectureId;
    }

    public void setLectureId(long lectureId) {
        this.lectureId = lectureId;
    }

    public short getRatings() {
        return ratings;
    }

    public void setRatings(short ratings) {
        this.ratings = ratings;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
