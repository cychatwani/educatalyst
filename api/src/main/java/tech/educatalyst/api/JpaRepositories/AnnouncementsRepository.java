package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.Announcements;
import tech.educatalyst.api.Models.Course;

import java.util.List;
import java.util.Set;

public interface AnnouncementsRepository extends JpaRepository<Announcements,Long> {
    Announcements findById(long id);
    @Override
    Announcements save(Announcements announcements);
    List<Announcements> findAllByCourse(Course course);
}
