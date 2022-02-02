package hello.hello.persistence.database.ports

import org.springframework.stereotype.Component
import hello.hello.persistence.database.entities.Token
import hello.hello.persistence.database.entities.User
import hello.hello.persistence.database.repositories.TokenRepository
import java.sql.Timestamp
import java.time.Instant
import java.util.*

@Component
class TokenPort(val repository: TokenRepository) {
    fun createNewToken(userId: User): Token {
        val token = Token(UUID.randomUUID().toString(), userId, Timestamp.from(Instant.now()))
        repository.save(token)
        return token
    }
}