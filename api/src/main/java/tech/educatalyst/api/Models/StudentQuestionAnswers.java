package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.util.Date;

@Entity
public class StudentQuestionAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private Date dateAnsweredOn;
    @ManyToOne()
    @JoinColumn(name = "question_id")
    private StudentQuestion studentQuestion;
    private String answer;
    private String image_url;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDateAnsweredOn() {
        return dateAnsweredOn;
    }

    public void setDateAnsweredOn(Date dateAnsweredOn) {
        this.dateAnsweredOn = dateAnsweredOn;
    }

    public StudentQuestion getStudentQuestion() {
        return studentQuestion;
    }

    public void setStudentQuestion(StudentQuestion studentQuestion) {
        this.studentQuestion = studentQuestion;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
