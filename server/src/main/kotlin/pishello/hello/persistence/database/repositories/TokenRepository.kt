package pishello.hello.persistence.database.repositories

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Component
import pishello.hello.persistence.database.entities.Token
import pishello.hello.persistence.database.entities.User


interface TokenRepository: CrudRepository<Token?, String?> {
    fun findByName(name: User): Token?
}