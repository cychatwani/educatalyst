package tech.educatalyst.api.JpaRepositories;


import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Course;
import tech.educatalyst.api.Models.Lecture;

import java.util.List;

public interface LectureRepositry extends JpaRepository<Lecture,Long> {
    Lecture save(Lecture lecture);
    Lecture findById(long lectureId);
    List<Lecture> findByCourse (Course course);
}
