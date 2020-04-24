package tech.educatalyst.api.Models;


//import org.graalvm.compiler.lir.LIRInstruction;
import tech.educatalyst.api.Models.DataTransferObjects.CourseDTO;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long courses_id;
    private String course_name;
    @Column(name = "course_key")
    private String courseKey;
    private String course_email;
    private String course_cover_image_url;
    private String course_description;
    private int course_capacity;
    @ManyToOne()
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @ManyToMany
    @JoinTable(
            name = "student_course_enrolement",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id"))
    Set<User> enroledStudents;

    public Course(){

    }

    public Course(CourseDTO courseDTO, User instructor){
        this.courses_id = courseDTO.getId();
        this.course_name = courseDTO.getCourse_name();
        this.course_capacity = courseDTO.getCourse_capacity();
        this.courseKey = courseDTO.getCourseKey();
        this.course_email  = courseDTO.getCourse_email();
        this.course_cover_image_url = courseDTO.getCourse_cover_image_url();
        this.instructor = instructor;
        this.course_description = courseDTO.getCourse_description();

    }

    public String getCourseKey() {
        return courseKey;
    }

    public void setCourseKey(String courseKey) {
        this.courseKey = courseKey;
    }

    public long getId() {
        return courses_id;
    }

    public void setId(long id) {
        this.courses_id = id;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public String getCourse_email() {
        return course_email;
    }

    public void setCourse_email(String course_email) {
        this.course_email = course_email;
    }

    public String getCourse_cover_image_url() {
        return course_cover_image_url;
    }

    public void setCourse_cover_image_url(String course_cover_image_url) {
        this.course_cover_image_url = course_cover_image_url;
    }

    public String getCourse_description() {
        return course_description;
    }

    public void setCourse_description(String course_description) {
        this.course_description = course_description;
    }

    public int getCourse_capacity() {
        return course_capacity;
    }

    public void setCourse_capacity(int course_capacity) {
        this.course_capacity = course_capacity;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public long getCourses_id() {
        return courses_id;
    }

    public void setCourses_id(long courses_id) {
        this.courses_id = courses_id;
    }

    public Set<User> getEnroledStudents() {
        return enroledStudents;
    }

    public void setEnroledStudents(Set<User> enroledStudents) {
        this.enroledStudents = enroledStudents;
    }
}
