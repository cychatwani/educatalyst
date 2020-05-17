package tech.educatalyst.api.Models.DataTransferObjects;

import javax.persistence.Column;
import java.sql.Time;
import java.util.Date;

public class LectureDto {
    private String courseKey;
    private Date lectureDate;
    private Time StartTime;
    private Time EndTime;
    private String LectureTitle;
    @Column(length=10485760)
    private String LectureDescription;

    public String getCourseKey() {
        return courseKey;
    }

    public void setCourseKey(String courseKey) {
        this.courseKey = courseKey;
    }

    public Date getLectureDate() {
        return lectureDate;
    }

    public void setLectureDate(Date lectureDate) {
        this.lectureDate = lectureDate;
    }

    public Time getStartTime() {
        return StartTime;
    }

    public void setStartTime(Time startTime) {
        StartTime = startTime;
    }

    public Time getEndTime() {
        return EndTime;
    }

    public void setEndTime(Time endTime) {
        EndTime = endTime;
    }

    public String getLectureTitle() {
        return LectureTitle;
    }

    public void setLectureTitle(String lectureTitle) {
        LectureTitle = lectureTitle;
    }

    public String getLectureDescription() {
        return LectureDescription;
    }

    public void setLectureDescription(String lectureDescription) {
        LectureDescription = lectureDescription;
    }
}
