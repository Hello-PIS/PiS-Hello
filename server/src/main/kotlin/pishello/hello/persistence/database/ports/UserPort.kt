package pishello.hello.persistence.database.ports

import org.springframework.stereotype.Component
import pishello.hello.persistence.database.entities.User
import pishello.hello.persistence.database.repositories.UserRepository

@Component
class UserPort(val repository: UserRepository) {
    fun checkIfUserExists(username: String): Boolean {
        return repository.findByName(username) != null
    }

    fun checkLogin(username: String, password: String): User? {
        return repository.findByNameAndPassword(username, password)
    }

    fun createNewUser(username: String, password: String): User {
        val user = User(username, password)
        repository.save(user)
        return user
    }
}