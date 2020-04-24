package tech.educatalyst.api.Models;

import javax.persistence.*;

@Entity
public class isFeedBackRegistered {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @ManyToOne()
    @JoinColumn(name = "student_id")
    private User student;
    @ManyToOne()
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Lecture getLecture() {
        return lecture;
    }

    public void setLecture(Lecture lecture) {
        this.lecture = lecture;
    }
}
