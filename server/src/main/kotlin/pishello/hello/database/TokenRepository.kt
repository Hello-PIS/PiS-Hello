package pishello.hello.database

import org.springframework.data.repository.CrudRepository


interface TokenRepository: CrudRepository<Token?, String?> {
    fun findByName(name: User): Token?
}