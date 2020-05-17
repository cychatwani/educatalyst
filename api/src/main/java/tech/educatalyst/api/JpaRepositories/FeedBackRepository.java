package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Lecture;
import tech.educatalyst.api.Models.StudentFeedBack;

import java.util.List;

public interface FeedBackRepository extends JpaRepository<StudentFeedBack,Long> {
    StudentFeedBack save(StudentFeedBack studentFeedBack);
    StudentFeedBack findById(long id);
    List<StudentFeedBack> findByLecture(Lecture lecture);
}
