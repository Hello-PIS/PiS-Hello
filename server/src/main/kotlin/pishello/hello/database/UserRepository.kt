package pishello.hello.database

import org.springframework.data.repository.CrudRepository


interface UserRepository: CrudRepository<User?, String?> {
    fun findByName(name: String): User?
    fun findByNameAndPassword(name: String, password: String): User?
}