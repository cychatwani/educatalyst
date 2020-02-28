package tech.educatalyst.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tech.educatalyst.api.JpaRepositories.CourseRepository;
import tech.educatalyst.api.JpaRepositories.UserRepository;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.ApiModels.EnrollmentRequest;
import tech.educatalyst.api.Models.Course;
import tech.educatalyst.api.Models.User;

import java.security.Principal;
import java.util.Set;

@RestController
public class StudentCourseEnroll{
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    UserRepository userRepository;
    @PostMapping("student/enrollcourse")
    public  ApiResponse<String> enrole(@RequestBody EnrollmentRequest enrollmentRequest, Principal principal)
    {
        Course course = courseRepository.findByCourseKey(enrollmentRequest.getRequestKey());
        Set<User> studentsEnrolled =  course.getEnroledStudents();
        if(studentsEnrolled.size() >= course.getCourse_capacity())
        {
            return new ApiResponse<>(HttpStatus.NO_CONTENT.value(),"Course Full","Sorry we cannot enroll you in  course named "+course.getCourse_name());

        }
        studentsEnrolled.add(userRepository.findByEmail(principal.getName()).get());
        course = courseRepository.save(course);
        return new ApiResponse<>(HttpStatus.OK.value(),"Success","You are SussesFully Enrolled in the course named "+course.getCourse_name());
    }


}
