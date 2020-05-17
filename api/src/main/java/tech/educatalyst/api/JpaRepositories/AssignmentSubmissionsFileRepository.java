package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.AssignmentSubmissonFiles;

public interface AssignmentSubmissionsFileRepository extends JpaRepository<AssignmentSubmissonFiles, Long> {
    AssignmentSubmissonFiles save(AssignmentSubmissonFiles assignmentSubmissonFiles);
}
