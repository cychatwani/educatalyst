package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Course;
import tech.educatalyst.api.Models.StudentQuestion;

import java.util.List;

public interface StudentQuestionRepository extends JpaRepository<StudentQuestion, Long> {
    StudentQuestion findById(long id);
    List<StudentQuestion> findAllByCourse(Course course);
    StudentQuestion save(StudentQuestion studentQuestion);
}