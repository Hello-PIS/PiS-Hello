package hello.hello.adapters.persistence.database

import hello.hello.adapters.persistence.database.entities.CardTable
import hello.hello.adapters.persistence.database.entities.TokenTable
import hello.hello.adapters.persistence.database.entities.UserTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.TransactionManager
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.core.env.Environment
import java.sql.Connection

fun init(env: Environment) {
    TransactionManager.defaultDatabase = Database.connect(
            env.getRequiredProperty("spring.datasource.url"),
            env.getRequiredProperty("spring.datasource.driver-class-name")
    )
    TransactionManager.manager.defaultIsolationLevel = Connection.TRANSACTION_SERIALIZABLE
}

fun create() {
    transaction {
        SchemaUtils.create(UserTable)
        SchemaUtils.create(TokenTable)
        SchemaUtils.create(CardTable)
    }
}

fun drop() {
    transaction {
        SchemaUtils.drop(UserTable)
        SchemaUtils.drop(TokenTable)
        SchemaUtils.drop(CardTable)
    }
}