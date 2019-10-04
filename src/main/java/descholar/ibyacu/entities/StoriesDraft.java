package descholar.ibyacu.entities;

import descholar.ibyacu.helperClasses.StringPrefixedSequenceIdGenerator;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="story_drafts")
public class StoriesDraft {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "story_draft_id_generator")
    @GenericGenerator(
            name = "story_draft_id_generator",
            strategy = "descholar.ibyacu.helperClasses.StringPrefixedSequenceIdGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator
                            .INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator
                            .VALUE_PREFIX_PARAMETER, value = "STRYDRFT"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator
                            .NUMBER_FORMAT_PARAMETER, value = "%1d")
            }
    )
    @Column(name = "story_id")
    private String storyId;

    @Column(name = "author_id")
    private String authorId;

    @Column(name = "editor_id")
    private String editorId;

    @Column(name = "added_on_datetime")
    private Timestamp addedOnDateTime;

    @Column(name = "edited_on_datetime")
    private Timestamp editedOnDateTime;

    @Column(name = "story_title")
    private String storyTitle;

    @Column(name = "story_content", length = 2147483647)
    private String storyContent;

    public String getStoryId() {
        return storyId;
    }

    public void setStoryId(String storyId) {
        this.storyId = storyId;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getEditorId() {
        return editorId;
    }

    public void setEditorId(String editorId) {
        this.editorId = editorId;
    }

    public Timestamp getAddedOnDateTime() {
        return addedOnDateTime;
    }

    public void setAddedOnDateTime(Timestamp addedOnDateTime) {
        this.addedOnDateTime = addedOnDateTime;
    }

    public Timestamp getEditedOnDateTime() {
        return editedOnDateTime;
    }

    public void setEditedOnDateTime(Timestamp editedOnDateTime) {
        this.editedOnDateTime = editedOnDateTime;
    }

    public String getStoryTitle() {
        return storyTitle;
    }

    public void setStoryTitle(String storyTitle) {
        this.storyTitle = storyTitle;
    }

    public String getStoryContent() {
        return storyContent;
    }

    public void setStoryContent(String storyContent) {
        this.storyContent = storyContent;
    }
}
