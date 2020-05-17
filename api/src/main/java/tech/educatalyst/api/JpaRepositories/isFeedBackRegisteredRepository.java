package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Lecture;
import tech.educatalyst.api.Models.User;
import tech.educatalyst.api.Models.isFeedBackRegistered;


public interface isFeedBackRegisteredRepository extends JpaRepository<isFeedBackRegistered, Long> {
    isFeedBackRegistered save(isFeedBackRegistered feedBackRegistered);
    isFeedBackRegistered findByStudentAndLecture (User student, Lecture lecture);
}
