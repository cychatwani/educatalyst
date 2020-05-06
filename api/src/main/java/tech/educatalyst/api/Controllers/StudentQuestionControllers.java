package tech.educatalyst.api.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.educatalyst.api.JpaRepositories.CourseRepository;
import tech.educatalyst.api.JpaRepositories.StudentQuestionRepository;
import tech.educatalyst.api.JpaRepositories.UserRepository;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.Course;
import tech.educatalyst.api.Models.DataTransferObjects.StudentQuestionDTO;
import tech.educatalyst.api.Models.StudentQuestion;
import tech.educatalyst.api.Models.User;

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
    StudentQuestionRepository studentQuestionRepository;
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
