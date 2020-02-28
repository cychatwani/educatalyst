package tech.educatalyst.api.JpaRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.educatalyst.api.Models.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
     User save(User user);
}
