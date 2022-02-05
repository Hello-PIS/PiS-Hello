package hello.hello.adapters.persistence.database.entities

import hello.hello.domain.models.Card
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable


object CardTable: IntIdTable(name = "cards") {
    var mode = varchar("mode", 7)
    var path = varchar("path", 120).nullable()
    var category = varchar("category", 40).nullable()
    var company = varchar("company", 40).nullable()
    var name = varchar("name", 40).nullable()
    var phone = varchar("phone", 12).nullable()
    var email = varchar("email", 40).nullable()
    var owner = reference("owner", UserTable)
}

class CardEntity(id: EntityID<Int>): IntEntity(id) {
    companion object : IntEntityClass<CardEntity>(CardTable)
    var mode     by CardTable.mode
    var path     by CardTable.path
    var category by CardTable.category
    var company  by CardTable.company
    var name     by CardTable.name
    var phone    by CardTable.phone
    var email    by CardTable.email
    var owner    by UserEntity referencedOn CardTable.owner
}

fun CardEntity.toCard(): Card =
    Card(id.value, mode, path, category, company, name, phone, email, owner.name)

fun Card.toCardEntity(): CardEntity =
    CardEntity.findById(id)!!
