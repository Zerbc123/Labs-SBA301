// DuyDLH-CE200667
package vn.edu.fpt.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Tag")
public class Tag implements Serializable {

    @Id
    @Column(name = "TagID")
    private Integer tagID;

    @Column(name = "TagName", length = 50)
    private String tagName;

    @Column(name = "Note", length = 400)
    private String note;

    public Tag() {
    }

    public Tag(Integer tagID, String tagName, String note) {
        this.tagID = tagID;
        this.tagName = tagName;
        this.note = note;
    }

    public Integer getTagID() {
        return tagID;
    }

    public void setTagID(Integer tagID) {
        this.tagID = tagID;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}

