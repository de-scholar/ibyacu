package descholar.ibyacu.services;

import descholar.ibyacu.entities.StoriesDraft;
import descholar.ibyacu.entities.StoriesKinyarwanda;
import descholar.ibyacu.entities.Users;
import descholar.ibyacu.helperClasses.LoggedInUser;
import descholar.ibyacu.helperClasses.PasswordEncoding;
import descholar.ibyacu.helperClasses.TimeHandler;
import descholar.ibyacu.repositories.StoryDraftRepo;
import descholar.ibyacu.repositories.StoryKinyaRepo;
import descholar.ibyacu.repositories.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class AllIbyacuServices {

    /*DEALING WITH USERS*/

    //REPOSITORIES
    @Autowired
    UsersRepo usersRepo;

    @Autowired
    StoryKinyaRepo storyKinyaRepo;

    @Autowired
    StoryDraftRepo storyDraftRepo;

    /*METHODS*/
    //SAVING A USER IN DATABASE
    public Users registerNewUser(
            String userId,
            String userFName,
            String userLName,
            String userGender,
            String userDateOfBirth,
            String userEmail,
            String username,
            String userPassword,
            String userAuthorities
    )throws ParseException {
        Users newUser = new Users();

        newUser.setUserFName(userFName);
        newUser.setUserLName(userLName);
        newUser.setUserGender(userGender);
        newUser.setUserDateOfBirth(new TimeHandler()
                .convertStringToSqlDate(userDateOfBirth));
        newUser.setUserEmail(userEmail);
        newUser.setUsername(username);
        newUser.setPassword(new PasswordEncoding().encodePassword().encode(userPassword));
        newUser.setUserAuthorities(userAuthorities);

        if (userId.equals(null)){
            return usersRepo.save(newUser);
        }else {
            Users userForEdit = newUser;
            userForEdit.setUserId(userId);
            return usersRepo.save(userForEdit);
        }

    }

    //LOGGED IN USER
    public Users getLoggedInUser(){
        return usersRepo.findByUsername(new LoggedInUser().loggedInUsername());
    }

    /*GETTING A USER INFO BY USER_ID*/
    public Users getUserInfoByUserId(String userId){
        return usersRepo.getByUserId(userId);
    }

    /*DEALING WITH STORIES*/

    //SAVING A NEW STORY
    public StoriesKinyarwanda addNewKinyaStory(
            String storyId,
            String authorId,
            String editorId,
            String commentatorId,
            String addedOnDateTime,
            String editedOnDateTime,
            String numberOfReads,
            String storyTitle,
            String storyContent) throws ParseException{

        StoriesKinyarwanda newKinyaStory = new StoriesKinyarwanda();

        newKinyaStory.setAuthorId(authorId);
        newKinyaStory.setEditorId(editorId);
        newKinyaStory.setCommentatorId(commentatorId);
        newKinyaStory.setAddedOnDateTime(new TimeHandler()
                .convertStringToSqlDatetime(addedOnDateTime));
        newKinyaStory.setEditedOnDateTime(new TimeHandler()
                .convertStringToSqlDatetime(editedOnDateTime));
        newKinyaStory.setNumberOfReads(Long.parseLong(numberOfReads));
        newKinyaStory.setStoryTitle(storyTitle);
        newKinyaStory.setStoryContent(storyContent);

        if (storyId.equals(null)){
            return storyKinyaRepo.save(newKinyaStory);
        }else{
            StoriesKinyarwanda storyToEdit = newKinyaStory;
            storyToEdit.setStoryId(storyId);
            return storyKinyaRepo.save(storyToEdit);
        }
    }

    /*GETTING ALL STORIES*/
    public List<StoriesKinyarwanda> getAllStories(){
        return storyKinyaRepo.findAll();
    }

    /*DELETING A STORY*/
    public void deleteKinyaStory(String storyId){
       storyKinyaRepo.delete(storyKinyaRepo.getByStoryId(storyId));
    }

    /*ADDING NEW DRAFT IN THE DATABASE*/
    public StoriesDraft addNewDraft(
            String storyId,
            String authorId,
            String editorId,
            String addedOnDateTime,
            String editedOnDateTime,
            String storyTitle,
            String storyContent
    ) throws ParseException {
        StoriesDraft newStoryDraft = new StoriesDraft();

        newStoryDraft.setAuthorId(authorId);
        newStoryDraft.setEditorId(editorId);
        newStoryDraft.setAddedOnDateTime(new TimeHandler()
                .convertStringToSqlDatetime(addedOnDateTime));
        newStoryDraft.setEditedOnDateTime(new TimeHandler()
                .convertStringToSqlDatetime(editedOnDateTime));
        newStoryDraft.setStoryTitle(storyTitle);
        newStoryDraft.setStoryContent(storyContent);

        if(storyId.equals(null)){
            return storyDraftRepo.save(newStoryDraft);
        }else{
            StoriesDraft storyToEdit = newStoryDraft;
            storyToEdit.setStoryId(storyId);
            return storyDraftRepo.save(storyToEdit);
        }
    }


}
