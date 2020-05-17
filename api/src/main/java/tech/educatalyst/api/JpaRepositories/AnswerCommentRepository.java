package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.AnswerComment;
import tech.educatalyst.api.Models.StudentQuestionAnswers;

import java.util.List;

public interface AnswerCommentRepository extends JpaRepository<AnswerComment, Long> {
    AnswerComment save(AnswerComment answerComment);
    List<AnswerComment> findAllByStudentQuestionAnswers(StudentQuestionAnswers studentQuestionAnswers);
}
