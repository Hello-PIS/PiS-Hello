package hello.hello.adapters.persistence.database.adapters

import hello.hello.adapters.persistence.database.entities.TokenEntity
import hello.hello.adapters.persistence.database.entities.TokenTable
import hello.hello.adapters.persistence.database.entities.toToken
import hello.hello.adapters.persistence.database.entities.toUserEntity
import hello.hello.domain.models.Token
import hello.hello.domain.models.User
import hello.hello.domain.ports.TokenPort
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.Instant
import java.util.*

class TokenAdapter: TokenPort() {
    override fun create(user: User): Token =
        transaction {
            TokenEntity.new {
                this.token = EntityID(UUID.randomUUID().toString(), TokenTable)
                this.name = user.toUserEntity()
                this.creationDate = Instant.now()
            }.toToken()
        }
}