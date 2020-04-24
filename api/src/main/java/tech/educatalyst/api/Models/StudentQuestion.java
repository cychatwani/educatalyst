package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.util.Date;

@Entity
public class StudentQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private Date dateAskedOn;
    @ManyToOne()
    @JoinColumn(name = "course_id")
    private Course course;
    @ManyToOne()
    @JoinColumn(name = "student_id")
    private User student;
    private String question;

    private String image_url;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDateAskedOn() {
        return dateAskedOn;
    }

    public void setDateAskedOn(Date dateAskedOn) {
        this.dateAskedOn = dateAskedOn;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
