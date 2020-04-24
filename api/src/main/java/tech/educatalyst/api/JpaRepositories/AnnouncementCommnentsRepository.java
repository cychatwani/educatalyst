package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.AnnouncementComments;
import tech.educatalyst.api.Models.Announcements;

import java.util.List;

public interface AnnouncementCommnentsRepository extends JpaRepository<AnnouncementComments, Long> {
    List<AnnouncementComments> findAllByAnnouncement(Announcements announcements);
    AnnouncementComments findById(long id);
    @Override
    AnnouncementComments save(AnnouncementComments announcementComments);
}
