package tech.educatalyst.api.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class AnswerComment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @ManyToOne()
    @JoinColumn(name = "answer_id")
    private StudentQuestionAnswers studentQuestionAnswers;
    @ManyToOne()
    @JoinColumn(name = "commenter_id")
    private User commenter;
    @Column(length=10485760)
    private String comment;
    @ManyToOne()
    @JoinColumn(name = "parent_id")
    AnswerComment parentComment;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public StudentQuestionAnswers getStudentQuestionAnswers() {
        return studentQuestionAnswers;
    }

    public void setStudentQuestionAnswers(StudentQuestionAnswers studentQuestionAnswers) {
        this.studentQuestionAnswers = studentQuestionAnswers;
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

    public AnswerComment getParentComment() {
        return parentComment;
    }

    public void setParentComment(AnswerComment parentComment) {
        this.parentComment = parentComment;
    }

    public List<AnswerComment> getReplyComments() {
        return replyComments;
    }

    public void setReplyComments(List<AnswerComment> replyComments) {
        this.replyComments = replyComments;
    }

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            mappedBy = "parentComment"
    )
    private List<AnswerComment> replyComments;
}
