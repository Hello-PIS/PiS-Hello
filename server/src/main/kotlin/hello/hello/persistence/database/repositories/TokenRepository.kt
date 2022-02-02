package hello.hello.persistence.database.repositories

import org.springframework.data.repository.CrudRepository
import hello.hello.persistence.database.entities.Token
import hello.hello.persistence.database.entities.User


interface TokenRepository: CrudRepository<Token?, String?> {
    fun findByName(name: User): Token?
}