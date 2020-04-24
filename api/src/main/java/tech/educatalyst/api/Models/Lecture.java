package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
public class Lecture {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private Date lectureDate;
    private Time StartTime;
    private Time EndTime;
    private String LectureTitle;
    @Column(length=10485760)
    private String LectureDescription;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
