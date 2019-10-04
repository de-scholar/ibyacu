package descholar.ibyacu.controllers;

import descholar.ibyacu.entities.StoriesDraft;
import descholar.ibyacu.entities.StoriesKinyarwanda;
import descholar.ibyacu.entities.Users;
import descholar.ibyacu.helperClasses.LoggedInUser;
import descholar.ibyacu.repositories.StoryDraftRepo;
import descholar.ibyacu.services.AllIbyacuServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping(value = "/descholar")
public class RestAPIsController {

    /*SERVICES*/
    @Autowired
    AllIbyacuServices allIbyacuServices;

    /*REST APIs END-POINTS*/
    @PostMapping("/public/register-new-or-edit-existing-user")
    public Users registerNewUser(
            @RequestParam("userId") String userId,
            @RequestParam("userFName") String userFName,
            @RequestParam("userLName") String userLName,
            @RequestParam("userGender") String userGender,
            @RequestParam("userDateOfBirth") String userDateOfBirth,
            @RequestParam("userEmail") String userEmail,
            @RequestParam("username") String username,
            @RequestParam("userPassword") String userPassword,
            @RequestParam("userAuthorities") String userAuthorities
    ) throws ParseException {
        return allIbyacuServices.registerNewUser(
                userId,userFName,userLName,userGender,userDateOfBirth,
                userEmail,username,userPassword,userAuthorities
        );
    }

    //LOGGED IN USER
    @GetMapping("/private/get-current-user")
    public Users getCurrentUser(){
        Users userToSendToUI = new Users();
        Users foundUser = allIbyacuServices.getLoggedInUser();

        userToSendToUI.setUserId(foundUser.getUserId());
        userToSendToUI.setUserFName(foundUser.getUserFName());
        userToSendToUI.setUserLName(foundUser.getUserLName());
        userToSendToUI.setUserGender(foundUser.getUserGender());
        userToSendToUI.setUserDateOfBirth(foundUser.getUserDateOfBirth());
        userToSendToUI.setUserEmail(foundUser.getUserEmail());
        userToSendToUI.setUsername(foundUser.getUsername());
        userToSendToUI.setUserAuthorities(foundUser.getUserAuthorities());
        userToSendToUI.setListOfWrittenStories(foundUser.getListOfWrittenStories());
        userToSendToUI.setListOfEditedStories(foundUser.getListOfEditedStories());
        userToSendToUI.setListOfCommentedStories(foundUser.getListOfCommentedStories());
        userToSendToUI.setListOfDraftStories(foundUser.getListOfDraftStories());

        return userToSendToUI;
    }

    /*GETTING ANY USER USING USER ID*/
    @GetMapping(value = "/public/get-user-from-db/{userId}")
    public Users getUserInfo(@PathVariable String userId){
        Users gottenUser = allIbyacuServices.getUserInfoByUserId(userId);
        Users userInfoToDIsplay=new Users();
        userInfoToDIsplay.setUserId(gottenUser.getUserId());
        userInfoToDIsplay.setUsername(gottenUser.getUsername());
        return userInfoToDIsplay;
    }

    /*ADDING NEW KINYARWANDA STORY*/
    @PostMapping(value = "/private/posting/adding-new-kinyarwanda-story")
    public StoriesKinyarwanda addNewKinyaStory(
            @RequestParam("storyId") String storyId,
            @RequestParam("authorId") String authorId,
            @RequestParam("editorId") String editorId,
            @RequestParam("commentatorId") String commentatorId,
            @RequestParam("addedOnDateTime") String addedOnDateTime,
            @RequestParam("editedOnDateTime") String editedOnDateTime,
            @RequestParam("numberOfReads") String numberOfReads,
            @RequestParam("storyTitle") String storyTitle,
            @RequestParam("storyContent") String storyContent
    ) throws ParseException{
        return allIbyacuServices.addNewKinyaStory(storyId,authorId,editorId,commentatorId,
                addedOnDateTime,editedOnDateTime,numberOfReads,storyTitle,storyContent);
    }

    /*SHOWING ALL STORIES*/
    @GetMapping(value = "/public/get-all-stories")
    public List<StoriesKinyarwanda>showAllStories(){
        return allIbyacuServices.getAllStories();
    }

    /*DELETING A STORY*/
    @DeleteMapping(value = "/private/deleting/{storyId}")
    public ResponseEntity<?>deleteStory(@PathVariable String storyId){
        allIbyacuServices.deleteKinyaStory(storyId);
        return new ResponseEntity<>("The story is deleted!", HttpStatus.OK);
    }

    /*ADDING NEW DRAFT*/
    @PostMapping(value = "/private/posting/adding-new-draft")
    public StoriesDraft addNewDraft(
            @RequestParam("storyId") String storyId,
            @RequestParam("authorId") String authorId,
            @RequestParam("editorId") String editorId,
            @RequestParam("addedOnDateTime") String addedOnDateTime,
            @RequestParam("editedOnDateTime") String editedOnDateTime,
            @RequestParam("storyTitle") String storyTitle,
            @RequestParam("storyContent") String storyContent
    ) throws ParseException{
        return allIbyacuServices.addNewDraft(storyId,authorId,editorId,addedOnDateTime,editedOnDateTime,
                storyTitle,storyContent);
    }
}
