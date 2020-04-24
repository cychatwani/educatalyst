package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class AnnouncementComments {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @ManyToOne()
    @JoinColumn(name = "announcement_id")
    private Announcements announcement;
    @ManyToOne()
    @JoinColumn(name = "commenter_id")
    private User commenter;
    @Column(length=10485760)
    private String comment;

    @ManyToOne()
    @JoinColumn(name = "parent_id")
    AnnouncementComments parentComment;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            mappedBy = "parentComment"
    )
    private List<AnnouncementComments> replyComments;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Announcements getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(Announcements announcement) {
        this.announcement = announcement;
    }

    public User getCommenter() {
        return commenter;
    }

    public void setCommenter(User commenter) {
        this.commenter = commenter;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public AnnouncementComments getParentComment() {
        return parentComment;
    }

    public void setParentComment(AnnouncementComments parentComment) {
        this.parentComment = parentComment;
    }

    public List<AnnouncementComments> getReplyComments() {
        return replyComments;
    }

    public void setReplyComments(List<AnnouncementComments> replyComments) {
        this.replyComments = replyComments;
    }
}
