package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Assignment;
import tech.educatalyst.api.Models.Course;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
    Assignment save(Assignment save);
    List<Assignment> findByCourse(Course course);
    Optional<Assignment> findById(Long id);

}
