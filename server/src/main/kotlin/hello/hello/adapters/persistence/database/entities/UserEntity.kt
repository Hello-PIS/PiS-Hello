package hello.hello.adapters.persistence.database.entities

import hello.hello.domain.models.User
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.and

object UserTable: IntIdTable(name = "users") {
    val name = varchar("name", 40).uniqueIndex()
    val password = varchar("password", 40)
}

class UserEntity(id: EntityID<Int>): IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(UserTable)
    var name     by UserTable.name
    var password by UserTable.password
}

fun UserEntity.toUser(): User =
    User(this.name, this.password)

fun User.toUserEntity(): UserEntity =
    UserEntity.find { (UserTable.name eq name) and (UserTable.password eq password) }.first()
