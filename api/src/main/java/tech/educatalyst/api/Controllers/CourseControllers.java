package tech.educatalyst.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tech.educatalyst.api.JpaRepositories.AnnouncementsRepository;
import tech.educatalyst.api.JpaRepositories.CourseRepository;
import tech.educatalyst.api.JpaRepositories.UserRepository;
import tech.educatalyst.api.Models.Announcements;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.ApiModels.EnrollmentRequest;
import tech.educatalyst.api.Models.Course;
import tech.educatalyst.api.Models.DataTransferObjects.AnnouncementsDTO;
import tech.educatalyst.api.Models.User;
import java.security.Principal;
import java.util.*;

@RestController
public class CourseControllers {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    AnnouncementsRepository announcementsRepository;


    @CrossOrigin
    @GetMapping("courseInfo")
     public Course getCourse(Principal principal, @RequestParam String key) {
        Course course = courseRepository.findByCourseKey(key);
        User user = userRepository.findByEmail(principal.getName()).get();
        if(user.getEmail() != course.getInstructor().getEmail()){
            
        }
        for(User student : course.getEnroledStudents()){
            student.setPassword(null);
            student.setCourses_enrolled_in(null);
        }
        User teacher = (course.getInstructor());
        teacher.setPassword(null);
        teacher.setCourses_enrolled_in(null);
        course.setInstructor(teacher);
        return course;
    }

    @CrossOrigin
    @GetMapping("userinfo")
    public ApiResponse<User> getUserInfo(Principal principal)
    {
        User user = userRepository.findByEmail(principal.getName()).get();
        user.setPassword(null);
        user.setId(0);
        for(Course course: user.getCourses_enrolled_in()){
            course.setEnroledStudents(null);
            course.getInstructor().setPassword("");
            course.getInstructor().setId(0);
        }
        return new ApiResponse<>(HttpStatus.OK.value(),"Success",user);
    }
    @CrossOrigin
    @GetMapping("faculty/getcourses")
    public ApiResponse<Set<Course>> facultyGetALLCourses(Principal principal){
        User Instructor = userRepository.findByEmail(principal.getName()).get();
        Set<Course> courses = courseRepository.findAllByInstructor(Instructor);
        for(Course course :courses) {
            for(User student : course.getEnroledStudents()){
                student.setPassword(null);
                student.setCourses_enrolled_in(null);
            }
        }
        return new ApiResponse<>(HttpStatus.OK.value(),"Success",courses);
    }
    @CrossOrigin
    @GetMapping("student/getcourses")
    public ApiResponse<List<Course>> studentGetALLCourses(Principal principal){
        User student = userRepository.findByEmail(principal.getName()).get();
        Set<Course> courses = student.getCourses_enrolled_in();
        for(Course course :courses) {
            User instructor = (course.getInstructor());
            instructor.setPassword(null);
            course.setInstructor(instructor);
            Set<User> students = course.getEnroledStudents();
            for (User user : students) user.setCourses_enrolled_in(null);
        }
        List<Course> courseList = new ArrayList<>(courses);
        Comparator<Course> courseComparator = new Comparator<Course>() {
            @Override
            public int compare(Course c1, Course c2) {
                Long id1 = c1.getId();
                Long id2 = c2.getId();
                return id1.compareTo(id2);

            }
        };
        Collections.sort(courseList,courseComparator);
        return new ApiResponse<>(HttpStatus.OK.value(),"Success",courseList);
    }

    @CrossOrigin
    @PostMapping("student/enrollcourse")
    public  ApiResponse<String> enrole(@RequestBody EnrollmentRequest enrollmentRequest, Principal principal)
    {
        System.out.println("hello World");
        Course course = courseRepository.findByCourseKey(enrollmentRequest.getRequestKey());
        if(course == null) {
            return new ApiResponse<>(HttpStatus.NO_CONTENT.value(),"INVALID","Sorry we cannot enroll you");

        }

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
