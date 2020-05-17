package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.StudentQuestion;
import tech.educatalyst.api.Models.StudentQuestionAnswers;

import java.util.List;

public interface StudentQuestionAnswersRepository extends JpaRepository<StudentQuestionAnswers, Long> {
    StudentQuestionAnswers save(StudentQuestionAnswers studentQuestionAnswers);
    StudentQuestionAnswers findById(long id);
    List<StudentQuestionAnswers> findAllByStudentQuestion(StudentQuestion question);
}
