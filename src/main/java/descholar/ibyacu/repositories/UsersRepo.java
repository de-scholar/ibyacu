package descholar.ibyacu.repositories;

import descholar.ibyacu.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<Users,String> {
    //SAVING NEW USER
    <NewUser extends Users>NewUser save(NewUser newUser);

    //FINDING A USER
    Users findByUsername(String username);

    //FINDING A USER BY ID
    Users getByUserId(String id);
}
