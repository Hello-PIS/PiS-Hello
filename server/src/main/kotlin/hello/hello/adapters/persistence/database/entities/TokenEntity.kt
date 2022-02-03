package hello.hello.adapters.persistence.database.entities

import hello.hello.domain.models.Token
import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.javatime.timestamp
import java.util.*

// TODO: this should be a UUIDTable
object TokenTable: IdTable<String>(name = "tokens") {
    val token = varchar("token", 40).entityId()
    val name = reference("name", UserTable)
    val creationDate = timestamp("creation_date")

    override val id = token
}

class TokenEntity(id: EntityID<String>): Entity<String>(id) {
    companion object : EntityClass<String, TokenEntity>(TokenTable)
    var token        by TokenTable.token
    var name         by UserEntity referencedOn TokenTable.name
    var creationDate by TokenTable.creationDate
}

fun TokenEntity.toToken(): Token =
    Token(UUID.fromString(token.value), name.toUser(), creationDate)

fun Token.toTokenEntity(): TokenEntity =
    TokenEntity.findById(token.toString())!!
