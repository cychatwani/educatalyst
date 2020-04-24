package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
public class Announcements {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private
    long id;
    private Date dateMadeOn;
    @ManyToOne()
    @JoinColumn(name = "course_id")
    private Course course;
    private String title;
    @Column(length=10485760)
    private String details;



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDateMadeOn() {
        return dateMadeOn;
    }

    public void setDateMadeOn(Date dateMadeOn) {
        this.dateMadeOn = dateMadeOn;
    }


    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return this.title;
    }
}
