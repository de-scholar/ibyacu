package descholar.ibyacu.repositories;

import descholar.ibyacu.entities.StoriesDraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryDraftRepo extends JpaRepository<StoriesDraft,String> {
    /*SAVING NEW DRAFT*/
    <NewDraft extends StoriesDraft>NewDraft save(NewDraft newDraft);
}
