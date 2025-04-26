package ict.mahidol.gemini.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ict.mahidol.gemini.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findByUsername(String username);
}
