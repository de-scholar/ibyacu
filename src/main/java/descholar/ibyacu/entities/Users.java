package descholar.ibyacu.entities;

import descholar.ibyacu.helperClasses.StringPrefixedSequenceIdGenerator;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_generator")
    @GenericGenerator(
            name = "user_id_generator",
            strategy = "descholar.ibyacu.helperClasses.StringPrefixedSequenceIdGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator
                            .INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator
                            .VALUE_PREFIX_PARAMETER, value = "USR"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceIdGenerator
                            .NUMBER_FORMAT_PARAMETER, value = "%1d")
            }
    )
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_family_name")
    private String userFName;

    @Column(name = "user_last_name")
    private String userLName;

    @Column(name = "user_gender")
    private String userGender;

    @Column(name = "user_date_of_birth")
    private Date userDateOfBirth;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "user_authorities")
    private String userAuthorities;

    /*USERS ACTIONS*/
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id",referencedColumnName = "user_id")
    private List<StoriesKinyarwanda>listOfWrittenStories;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "editor_id",referencedColumnName = "user_id")
    private List<StoriesKinyarwanda>listOfEditedStories;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "commentator_id",referencedColumnName = "user_id")
    private List<StoriesKinyarwanda>listOfCommentedStories;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", referencedColumnName = "user_id")
    private List<StoriesDraft>listOfDraftStories;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserFName() {
        return userFName;
    }

    public void setUserFName(String userFName) {
        this.userFName = userFName;
    }

    public String getUserLName() {
        return userLName;
    }

    public void setUserLName(String userLName) {
        this.userLName = userLName;
    }

    public String getUserGender() {
        return userGender;
    }

    public void setUserGender(String userGender) {
        this.userGender = userGender;
    }

    public Date getUserDateOfBirth() {
        return userDateOfBirth;
    }

    public void setUserDateOfBirth(Date userDateOfBirth) {
        this.userDateOfBirth = userDateOfBirth;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserAuthorities() {
        return userAuthorities;
    }

    public void setUserAuthorities(String userAuthorities) {
        this.userAuthorities = userAuthorities;
    }

    public List<StoriesKinyarwanda> getListOfWrittenStories() {
        return listOfWrittenStories;
    }

    public void setListOfWrittenStories(List<StoriesKinyarwanda> listOfWrittenStories) {
        this.listOfWrittenStories = listOfWrittenStories;
    }

    public List<StoriesKinyarwanda> getListOfEditedStories() {
        return listOfEditedStories;
    }

    public void setListOfEditedStories(List<StoriesKinyarwanda> listOfEditedStories) {
        this.listOfEditedStories = listOfEditedStories;
    }

    public List<StoriesKinyarwanda> getListOfCommentedStories() {
        return listOfCommentedStories;
    }

    public void setListOfCommentedStories(List<StoriesKinyarwanda> listOfCommentedStories) {
        this.listOfCommentedStories = listOfCommentedStories;
    }

    public List<StoriesDraft> getListOfDraftStories() {
        return listOfDraftStories;
    }

    public void setListOfDraftStories(List<StoriesDraft> listOfDraftStories) {
        this.listOfDraftStories = listOfDraftStories;
    }
}
