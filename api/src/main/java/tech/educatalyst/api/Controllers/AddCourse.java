package tech.educatalyst.api.Controllers;


import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tech.educatalyst.api.JpaRepositories.CourseRepository;
import tech.educatalyst.api.JpaRepositories.RedisRepos.UniqueCourseKeyRepository;
import tech.educatalyst.api.JpaRepositories.UserRepository;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.Course;
import tech.educatalyst.api.Models.DataTransferObjects.CourseDTO;
import tech.educatalyst.api.Models.User;

import java.nio.charset.StandardCharsets;
import java.security.Principal;


@RestController
public class AddCourse {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    private UniqueCourseKeyRepository uniqueCourseKeyRepository;
    private final  String UnderScore = "_";
    @PostMapping("faculty/addnewcourse")
    public ApiResponse<NewCourse> newcourse(@RequestBody CourseDTO courseDTO,Principal principal) {
        String email =  principal.getName(); // we are using email to login as username
        User user = userRepository.findByEmail(email).get();
        int salt = 0;
        String tempString = courseDTO.getCourse_name()+ this.UnderScore + user.getEmail() + this.UnderScore +user.getId();
        String key = tempString  +this.UnderScore + salt;
        String hashedKey = Hashing.murmur3_32().hashString(key, StandardCharsets.UTF_8).toString();
        while(uniqueCourseKeyRepository.iskeyused(hashedKey)){
            salt++;
            key = tempString  + this.UnderScore + salt;
            hashedKey = Hashing.murmur3_32().hashString(key, StandardCharsets.UTF_8).toString();
        }
        uniqueCourseKeyRepository.addkeys(hashedKey);
        Course course = new Course(courseDTO,user);
        course.setCourseKey(hashedKey);
        course = courseRepository.save(course);
        NewCourse newCourse = new NewCourse(course.getCourseKey(),course.getId());

        return new ApiResponse<>(HttpStatus.OK.value(),"New Course Added",newCourse);
    }


    private class NewCourse{
        private String key;
        private long id;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public NewCourse(String key, long id){
            this.key = key;
            this.id = id;

        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }
    }
}
