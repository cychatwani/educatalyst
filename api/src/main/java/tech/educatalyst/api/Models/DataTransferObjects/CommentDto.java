package tech.educatalyst.api.Models.DataTransferObjects;

public   class CommentDto{
    private long replyID;
    private String replyComment;
    private String replyType;

    public long getReplyID() {
        return replyID;
    }

    public void setReplyID(long replyID) {
        this.replyID = replyID;
    }

    public String getReplyComment() {
        return replyComment;
    }

    public void setReplyComment(String replyComment) {
        this.replyComment = replyComment;
    }

    public String getReplyType() {
        return replyType;
    }

    public void setReplyType(String replyType) {
        this.replyType = replyType;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "replyID=" + replyID +
                ", replyComment='" + replyComment + '\'' +
                ", replyType='" + replyType + '\'' +
                '}';
    }
}