package tech.educatalyst.api.Models.DataTransferObjects;

import java.util.Date;

public class AnnouncementsDTO {
    private String courseKey;
    private String title;
    private String details;



    public String getCourseKey() {
        return courseKey;
    }

    public void setCourseKey(String courseKey) {
        this.courseKey = courseKey;
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
}
