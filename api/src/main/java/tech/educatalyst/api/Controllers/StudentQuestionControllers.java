package tech.educatalyst.api.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.educatalyst.api.JpaRepositories.*;
import tech.educatalyst.api.Models.*;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.DataTransferObjects.AnswerDto;
import tech.educatalyst.api.Models.DataTransferObjects.StudentQuestionDTO;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
public class StudentQuestionControllers {
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StudentQuestionAnswersRepository studentQuestionAnswersRepository;
    @Autowired
    AnswerCommentRepository answerCommentRepository;
    @Autowired
    StudentQuestionRepository studentQuestionRepository;

    @CrossOrigin
    @PostMapping("faculty/answerQuestion")
    public ApiResponse<String> answer(Principal principal, @RequestBody AnswerDto answerRequest){
      StudentQuestion question =   studentQuestionRepository.findById(answerRequest.getQuestionId());
      StudentQuestionAnswers answer = new StudentQuestionAnswers();
      answer.setStudentQuestion(question);
      answer.setAnswer(answerRequest.getAnswer());
      answer.setDateAnsweredOn(new Date());
      answer.setImage_url(answerRequest.getImage_url());
      studentQuestionAnswersRepository.save(answer);
      return new ApiResponse<>(200, "Success", "Done");
    }

    @CrossOrigin
    @PostMapping("student/askQuestion")
    public ApiResponse<String> makeQuestion(Principal principal, @RequestBody StudentQuestionDTO questionRequest){
        Course course = courseRepository.findByCourseKey(questionRequest.getCourseKey());
        User student = userRepository.findByEmail(principal.getName()).get();
        StudentQuestion studentQuestion = new StudentQuestion();
        studentQuestion.setStudent(student);
        studentQuestion.setCourse(course);
        studentQuestion.setDateAskedOn(new Date());
        studentQuestion.setQuestion(questionRequest.getQuestion());
        studentQuestion.setImage_url(questionRequest.getImageUrl());
        studentQuestionRepository.save(studentQuestion);
        return new   ApiResponse<>(200,"Success","Question asked");
    }
    private void fixcomments(List<AnswerComment> comments){
        for(AnswerComment comment: comments){
            comment.setStudentQuestionAnswers(null);
            User commenter = comment.getCommenter();
            commenter.setCourses_enrolled_in(null);

            comment.setParentComment(null);
            System.out.println(comment.getComment());
            fixcomments(comment.getReplyComments());
        }
    }
    @CrossOrigin
    @GetMapping("AnswerComments")
    public ApiResponse<List<AnswerComment>> getAllCourseAnnouncementsComments(@RequestParam long id){
        StudentQuestionAnswers answer = this.studentQuestionAnswersRepository.findById(id);
        List<AnswerComment> comments = answerCommentRepository.findAllByStudentQuestionAnswers(answer);
        fixcomments(comments);
        return new ApiResponse(200,"Success",comments);
    }


    @CrossOrigin
    @GetMapping("QuestionAnswers")
    public ApiResponse<StudentQuestionAnswers> getAnswers(@RequestParam Long id){
        StudentQuestion question = studentQuestionRepository.findById(id).get();
        List<StudentQuestionAnswers> answers = studentQuestionAnswersRepository.findAllByStudentQuestion(question);
        for(StudentQuestionAnswers questionAnswer : answers){
            questionAnswer.setStudentQuestion(null);

        }
        return  new ApiResponse<>(200,"Success",answers);
    }
    @CrossOrigin
    @GetMapping("courseQuestions")
    public ApiResponse<List<StudentQuestion>> getAllCourseQuestions(Principal principal, @RequestParam String key){
        Course course = courseRepository.findByCourseKey(key);
        List<StudentQuestion> studentQuestions =  studentQuestionRepository.findAllByCourse(course);
        for(StudentQuestion studentQuestion : studentQuestions) {
            studentQuestion.setCourse(null);
            User student = studentQuestion.getStudent();
            student.setCourses_enrolled_in(null);
            student.setPassword(null);
            student.setUsers_id(0);
            studentQuestion.setStudent(student);
        }
        return new ApiResponse<>(200,"Success",studentQuestions);
    }

}
