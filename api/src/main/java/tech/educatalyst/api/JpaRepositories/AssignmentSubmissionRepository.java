package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Assignment;
import tech.educatalyst.api.Models.AssignmentSubmissons;
import tech.educatalyst.api.Models.User;

import java.util.List;

public interface AssignmentSubmissionRepository extends JpaRepository<AssignmentSubmissons,Long> {
    AssignmentSubmissons save(AssignmentSubmissons assignmentSubmissons);
    List<AssignmentSubmissons> findByAssignment(Assignment assignment);
    List<AssignmentSubmissons> findByStudent(User student);
    AssignmentSubmissons findById(long id);
}
