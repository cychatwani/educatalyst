package tech.educatalyst.api.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.educatalyst.api.JpaRepositories.AnnouncementCommnentsRepository;
import tech.educatalyst.api.JpaRepositories.AnnouncementsRepository;
import tech.educatalyst.api.JpaRepositories.CourseRepository;
import tech.educatalyst.api.JpaRepositories.UserRepository;
import tech.educatalyst.api.Models.AnnouncementComments;
import tech.educatalyst.api.Models.Announcements;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.Course;
import tech.educatalyst.api.Models.DataTransferObjects.AnnouncementsDTO;
import tech.educatalyst.api.Models.DataTransferObjects.CommentDto;
import tech.educatalyst.api.Models.User;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
public class AnnoucementControllers {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    AnnouncementsRepository announcementsRepository;
    @Autowired
    AnnouncementCommnentsRepository announcementCommnentsRepository;

    @CrossOrigin
    @PostMapping("faculty/makeAnnouncement")
    public ApiResponse getAllCourseAnnouncements(Principal principal, @RequestBody AnnouncementsDTO announcementRequest) {
        Course course = courseRepository.findByCourseKey(announcementRequest.getCourseKey());
        User u1 = userRepository.findByEmail(principal.getName()).get();
        User u2 = course.getInstructor();
        if(u1.getId() != u2.getId()){
            return new ApiResponse(403, "You Are Not Authenticated to make this announcement", null);
        }
        Announcements announcement = new Announcements();
        announcement.setCourse(course);
        announcement.setDateMadeOn(new Date());
        announcement.setTitle(announcementRequest.getTitle());
        announcement.setDetails(announcementRequest.getDetails());
        announcementsRepository.save(announcement);
        return new ApiResponse(200, "Success", announcementRequest);
    }
    @CrossOrigin
    @GetMapping("courseAllAnnouncements")
    public ApiResponse<List<Announcements>> getAllCourseAnnouncements(Principal principal, @RequestParam String key){
        Course course = courseRepository.findByCourseKey(key);
        List<Announcements> announcements = announcementsRepository.findAllByCourse(course);
        for(Announcements announcement : announcements){
            announcement.setCourse(null);
        }
        return new ApiResponse<>(200,"Sucess",announcements);
    }

    @CrossOrigin
    @GetMapping("AnnouncementComments")
    public List<AnnouncementComments> getAllCourseAnnouncementsComments(@RequestParam long accID){
        Announcements announcement = announcementsRepository.findById(accID);
        List<AnnouncementComments> announcementComments = announcementCommnentsRepository.findAllByAnnouncement(announcement);
        fixcomments(announcementComments);
        return announcementComments;
    }
    private void fixcomments(List<AnnouncementComments> comments){
        for(AnnouncementComments comment: comments){
            User commenter = comment.getCommenter();
            commenter.setCourses_enrolled_in(null);
            comment.setAnnouncement(null);
            comment.setParentComment(null);
            fixcomments(comment.getReplyComments());
        }
    }
    @CrossOrigin
    @PostMapping("makeComment")
    public  ApiResponse<String> makeComment(@RequestBody CommentDto commentDto, Principal principal ){
        AnnouncementComments announcementComment = new AnnouncementComments();
       // System.out.println(commentDto);
        if(commentDto.getReplyType().equals("comment")){
            announcementComment.setAnnouncement(null);
            AnnouncementComments parenComment = announcementCommnentsRepository.findById(commentDto.getReplyID());
            announcementComment.setParentComment(parenComment);
        }
        else if (commentDto.getReplyType().equals("announcement")) {
            announcementComment.setParentComment(null);
            announcementComment.setAnnouncement(announcementsRepository.findById(commentDto.getReplyID()));
        }
        else
        {
            return new ApiResponse<>(404,"Error","comment has to be reply to somthing");
        }
        announcementComment.setComment(commentDto.getReplyComment());
        announcementComment.setCommenter(userRepository.findByEmail(principal.getName()).get());
        List replies = new ArrayList<Announcements>();
        announcementComment.setReplyComments(replies);
        announcementCommnentsRepository.save(announcementComment);
        return new ApiResponse<>(200,"Success","You ave commented");
    }


}
