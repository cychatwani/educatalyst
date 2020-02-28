package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Course;


public interface CourseRepository extends JpaRepository<Course,Long> {
    Course findByCourseKey(String course_key);
    @Override
    Course save(Course entity);
}
