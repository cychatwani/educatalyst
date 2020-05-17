package tech.educatalyst.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.educatalyst.api.JpaRepositories.*;
import tech.educatalyst.api.Models.*;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.DataTransferObjects.LectureDto;
import tech.educatalyst.api.Models.ApiModels.LecturesResponse;
import tech.educatalyst.api.Models.DataTransferObjects.feedBackDto;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@RestController
public class LectureFeedBackControllers {
    @Autowired
    UserRepository userRepository;
    @Autowired
    FeedBackRepository feedBackRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    LectureRepositry lectureRepositry;
    @Autowired
    isFeedBackRegisteredRepository  isFeedBackRegisteredRepository;

    @CrossOrigin
    @GetMapping("getCourseLectures")
    public ApiResponse<LecturesResponse> getLectures(Principal principal, @RequestParam String key){
        Course course = courseRepository.findByCourseKey(key);
        User student = userRepository.findByEmail(principal.getName()).get();
        List<Lecture> RatedLectures = new ArrayList<>();
        List<Lecture> UnRatedLectures = new ArrayList<>();
        List<Lecture> lectures = lectureRepositry.findByCourse(course);
        for (Lecture lecture: lectures){
            lecture.setCourse(null);
            if(isFeedBackRegisteredRepository.findByStudentAndLecture(student, lecture) != null){
                RatedLectures.add(lecture);
            }
            else UnRatedLectures.add(lecture);
        }
        LecturesResponse lecturesResponse = new LecturesResponse();
        lecturesResponse.setRatedLectures(RatedLectures);
        lecturesResponse.setUnRatedLectures(UnRatedLectures);
        return new ApiResponse<>(200, "Success", lecturesResponse);
    }
    @CrossOrigin
    @GetMapping("faculty/getLectureFeedBacks")
    public ApiResponse<List<StudentFeedBack>>  getfeedBack(@RequestParam Long id){
        Lecture lecture = lectureRepositry.findById(id).get();
        List<StudentFeedBack> studentFeedBacks=  feedBackRepository.findByLecture(lecture);
        for(StudentFeedBack feedBack: studentFeedBacks) {
            feedBack.setLecture(null);
        };
        return new ApiResponse<>(200,"Success", studentFeedBacks);
    }


    @CrossOrigin
    @PostMapping("faculty/registerLecture")
    public ApiResponse<String> registerFeedBack(@RequestBody LectureDto lectureRequest){
            String CourseKey =  lectureRequest.getCourseKey();
            Course course = courseRepository.findByCourseKey(CourseKey);
            Lecture lecture = new Lecture();
            lecture.setCourse(course);
            lecture.setLectureTitle(lectureRequest.getLectureTitle());
            lecture.setLectureDescription(lectureRequest.getLectureDescription());
            lecture.setStartTime(lectureRequest.getStartTime());
            lecture.setLectureDate(lectureRequest.getLectureDate());
            lecture.setEndTime(lectureRequest.getEndTime());
            lectureRepositry.save(lecture);
            return new ApiResponse<>(200,"Success","Lecture Added");
    }
    @CrossOrigin
    @PostMapping("student/registerFeedBack")
    public ApiResponse<String>  registerFeedBack(Principal principal, @RequestBody feedBackDto feedBackRequest){
        User student = userRepository.findByEmail(principal.getName()).get();
        Lecture lecture = lectureRepositry.findById(feedBackRequest.getLectureId());
        isFeedBackRegistered isFeedBackRegistered = isFeedBackRegisteredRepository.findByStudentAndLecture(student, lecture);
        if(isFeedBackRegistered != null){
            return new ApiResponse(401, "Error","FeedBackAlreadyRegisterd");
        }
        else{
            isFeedBackRegistered newIsFeedBackRegistered = new isFeedBackRegistered();
            newIsFeedBackRegistered.setLecture(lecture);
            newIsFeedBackRegistered.setStudent(student);
            isFeedBackRegisteredRepository.save(newIsFeedBackRegistered);
            StudentFeedBack studentFeedBack = new StudentFeedBack();
            studentFeedBack.setComment(feedBackRequest.getComment());
            studentFeedBack.setLecture(lecture);
            studentFeedBack.setRatings(feedBackRequest.getRatings());
            feedBackRepository.save(studentFeedBack);
            return new ApiResponse(200, "Success","Saved");
        }
    }

}
