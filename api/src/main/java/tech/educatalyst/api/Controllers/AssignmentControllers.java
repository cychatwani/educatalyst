package tech.educatalyst.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.educatalyst.api.JpaRepositories.*;
import tech.educatalyst.api.Models.*;
import tech.educatalyst.api.Models.ApiModels.ApiResponse;
import tech.educatalyst.api.Models.ApiModels.StudentCourseAssingmentResponce;
import tech.educatalyst.api.Models.DataTransferObjects.AssigenmentSubmissonDTO;
import tech.educatalyst.api.Models.DataTransferObjects.AssignmentDto;
import tech.educatalyst.api.Models.DataTransferObjects.EvaluationDto;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class AssignmentControllers {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    AssignmentRepository assignmentRepository;
    @Autowired
    AssignmentSubmissionRepository assignmentSubmissionRepository;
    @Autowired
    AssignmentSubmissionsFileRepository assignmentSubmissionsFileRepository;

    @CrossOrigin
    @PostMapping ("faculty/postAssignment")
    public ApiResponse<String> evaluate(@RequestBody AssignmentDto evaluationRequest){
       Course course =  courseRepository.findByCourseKey(evaluationRequest.getCourseKey());
        Assignment assignment = new Assignment();
        assignment.setCourse(course);
        assignment.setAssignmentDescription(evaluationRequest.getAssignmentDescription());
        assignment.setAssignmentFileUrl(evaluationRequest.getAssignmentFileUrl());
        assignment.setDateOpened(evaluationRequest.getDateOpened());
        assignment.setTittle(evaluationRequest.getTittle());
        assignment.setSubmissionDeadline(evaluationRequest.getSubmissionDeadline());
        assignment.setMaxPoints(evaluationRequest.getMaxPoints());
        assignmentRepository.save(assignment);
        return new ApiResponse<>(200, "Success", "Posted");
    }

    @CrossOrigin
    @PostMapping ("faculty/evaluateAssignment")
    public ApiResponse<String> evaluate(@RequestBody EvaluationDto evaluationRequest){
       AssignmentSubmissons submission =  assignmentSubmissionRepository.findById(evaluationRequest.getSubmissonId());
       if(submission.getAssignment().getMaxPoints() < evaluationRequest.getPoints())
           return new ApiResponse<>(500,"ERROR", "INVALID POINT");
       submission.setObtainedPoints(evaluationRequest.getPoints());
       submission.setDateOfEvaluation(new Date());
       assignmentSubmissionRepository.save(submission);
       return new ApiResponse<>(200,"Success", "Done");
    }

    @CrossOrigin
    @GetMapping("faculty/assignmentSubmissions")
    public ApiResponse<List<AssignmentSubmissons>> getSubmissons(@RequestParam long id){
        Assignment assignment = assignmentRepository.findById(id).get();
        List<AssignmentSubmissons> assignmentSubmissonsList = assignmentSubmissionRepository.findByAssignment(assignment);
        for(AssignmentSubmissons assignmentSubmissons: assignmentSubmissonsList){
            User student = assignmentSubmissons.getStudent();
            student.setPassword(null);
            student.setCourses_enrolled_in(null);
            assignmentSubmissons.setStudent(student);
            assignmentSubmissons.setAssignment(null);
            List<AssignmentSubmissonFiles> files = assignmentSubmissons.getFiles();
            for(AssignmentSubmissonFiles file : files){
                file.setAssignmentSubmisson(null);
            }
            assignmentSubmissons.setFiles(files);
        }
        return new ApiResponse<>(200,"Success",assignmentSubmissonsList);
    }

    @CrossOrigin
    @PostMapping("student/submitAssignment")
    public ApiResponse<String> SubmitAssignments(Principal principal, @RequestBody AssigenmentSubmissonDTO submitRequest) {
        Assignment assignment =  assignmentRepository.findById(submitRequest.getAssignmentId()).get();
        Date currentDate = new Date();
        if(currentDate.after(assignment.getSubmissionDeadline())){
            return new ApiResponse<>(500,"ERROR", "DEADLINE");
        }else{
            AssignmentSubmissons Submission = new AssignmentSubmissons();
            List<AssignmentSubmissonFiles> assignmentSubmissonFiles = new ArrayList<>();
            for(String path : submitRequest.getFilePaths()){
                AssignmentSubmissonFiles file = new AssignmentSubmissonFiles();
                file.setFileUrl(path);
                file.setAssignmentSubmisson(Submission);
                file = assignmentSubmissionsFileRepository.save(file);
                assignmentSubmissonFiles.add(file);
            }
            User student = userRepository.findByEmail(principal.getName()).get();
            Submission.setFiles(assignmentSubmissonFiles);
            Submission.setAssignment(assignment);
            Submission.setDateOfEvaluation(null);
            Submission.setDateOfSubmission(currentDate);
            Submission.setDetails(submitRequest.getDescription());
            Submission.setObtainedPoints(-1);
            Submission.setStudent(student);
            assignmentSubmissionRepository.save(Submission);
            return new ApiResponse(200,"Success","Assignment Submitted");
        }
    }

    @CrossOrigin
    @GetMapping("courseAssignments")
    public ApiResponse<StudentCourseAssingmentResponce> getCourses(Principal principal, @RequestParam String key){
        Course course = courseRepository.findByCourseKey(key);
        List<Assignment> assignments = assignmentRepository.findByCourse(course);
        User student = userRepository.findByEmail(principal.getName()).get();
        List <Assignment> submittedAssignments = new ArrayList<>();
        List <Assignment> pendingAssignments = new ArrayList<>();
        for(Assignment assignment : assignments){
            assignment.setCourse(null);
            List<AssignmentSubmissons> studentAssignmentsubs = assignmentSubmissionRepository.findByStudent(student);
            boolean assignmentSubmitted = false;
            for(AssignmentSubmissons sub : studentAssignmentsubs){
                if(sub.getAssignment().getId() == assignment.getId())
                    assignmentSubmitted = true;
            }
            if(assignmentSubmitted) submittedAssignments.add(assignment);
            else pendingAssignments.add(assignment);
        }
        StudentCourseAssingmentResponce studentCourseAssingmentResponce = new StudentCourseAssingmentResponce();
        studentCourseAssingmentResponce.setPendingAssignments(pendingAssignments);
        studentCourseAssingmentResponce.setSubmittedAssignments(submittedAssignments);
        return new ApiResponse<>(200,"Success",studentCourseAssingmentResponce);
    }

}
