package pishello.hello.persistence.database.repositories

import org.springframework.data.repository.CrudRepository
import pishello.hello.persistence.database.entities.User


interface UserRepository: CrudRepository<User?, String?> {
    fun findByName(name: String): User?
    fun findByNameAndPassword(name: String, password: String): User?
}