package tech.educatalyst.api.Models.ApiModels;

import tech.educatalyst.api.Models.Lecture;

import java.util.List;

public class LecturesResponse {
    List<Lecture> ratedLectures;

    public List<Lecture> getRatedLectures() {
        return ratedLectures;
    }

    public void setRatedLectures(List<Lecture> ratedLectures) {
        this.ratedLectures = ratedLectures;
    }

    public List<Lecture> getUnRatedLectures() {
        return unRatedLectures;
    }

    public void setUnRatedLectures(List<Lecture> unRatedLectures) {
        this.unRatedLectures = unRatedLectures;
    }

    List<Lecture> unRatedLectures;
}
