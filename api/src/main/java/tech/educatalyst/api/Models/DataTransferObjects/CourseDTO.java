package tech.educatalyst.api.Models.DataTransferObjects;

public class CourseDTO {
    private long id;
    private String course_name;
    private String courseKey;
    private String course_email;
    private String course_cover_image_url;
    private String course_description;
    private int course_capacity;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public String getCourseKey() {
        return courseKey;
    }

    public void setCourseKey(String courseKey) {
        this.courseKey = courseKey;
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

//    public long getInstructor_id() {
//        return instructor_id;
//    }
//
//    public void setInstructor_id(long instructor_id) {
//        this.instructor_id = instructor_id;
//    }
}
