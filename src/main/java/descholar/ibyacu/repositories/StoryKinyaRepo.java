package descholar.ibyacu.repositories;

import descholar.ibyacu.entities.StoriesKinyarwanda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoryKinyaRepo extends JpaRepository<StoriesKinyarwanda, String> {

    /*ADDING A NEW STORY*/
    <NewKinyaStory extends StoriesKinyarwanda> NewKinyaStory save(NewKinyaStory newStory);

    /*FINDING A STORY BY ID*/
    StoriesKinyarwanda getByStoryId(String storyId);

    /*DELETING A STORY*/
    void delete(StoriesKinyarwanda kinyaStory);

    /*GETTING ALL OF THE STORIES*/
    List<StoriesKinyarwanda> findAll();
}
