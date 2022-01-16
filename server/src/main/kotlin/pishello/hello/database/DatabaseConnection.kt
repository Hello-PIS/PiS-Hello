package pishello.hello.database

import org.springframework.stereotype.Component
import java.sql.Timestamp
import java.time.Instant
import java.util.*


@Component
class UserConnection(val repository: UserRepository) {
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

@Component
class TokenConnection(val repository: TokenRepository) {
    fun createNewToken(userId: User): Token {
        val token = Token(UUID.randomUUID().toString(), userId, Timestamp.from(Instant.now()))
        repository.save(token)
        return token
    }
}

@Component
class CardConnection(val repository: CardRepository) {
    fun getCardsById(cardId: Int): List<Card>? {
        return repository.findById(cardId)
    }
}