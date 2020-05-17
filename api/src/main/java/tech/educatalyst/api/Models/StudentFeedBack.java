package tech.educatalyst.api.Models;

import javax.persistence.*;

@Entity
public class StudentFeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @ManyToOne()
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
    private short ratings;
    private String comment;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Lecture getLecture() {
        return lecture;
    }

    public void setLecture(Lecture lecture) {
        this.lecture = lecture;
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
