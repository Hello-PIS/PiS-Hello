package hello.hello.adapters.persistence.database.adapters

import hello.hello.adapters.persistence.database.adapters.UserAdapter.Companion.findByName
import hello.hello.adapters.persistence.database.entities.CardEntity
import hello.hello.adapters.persistence.database.entities.CardTable
import hello.hello.adapters.persistence.database.entities.toCard
import hello.hello.adapters.persistence.database.entities.toCardEntity
import hello.hello.domain.models.Card
import hello.hello.domain.ports.CardPort
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction

class CardAdapter: CardPort() {

    private fun search(cardId: Int): List<Card> =
        CardEntity.find { (CardTable.id eq cardId) and (CardTable.mode eq "PUBLIC") }.toList().map { it.toCard() }

    private fun search(profession: String): List<Card> =
        CardEntity.find { (CardTable.category eq profession) and (CardTable.mode eq "PUBLIC") }.toList().map { it.toCard() }

    private fun search(ownerId: EntityID<Int>): List<Card> =
        CardEntity.find { (CardTable.owner eq ownerId) and (CardTable.mode eq "PUBLIC") }.toList().map { it.toCard() }

    private fun find(ownerId: EntityID<Int>): List<Card> =
        CardEntity.find { CardTable.owner eq ownerId }.toList().map { it.toCard() }

    override fun create(userName: String, mode: String, category: String?): Card? =
        transaction {
            val owner = findByName(userName) ?: return@transaction null
            CardEntity.new {
                this.mode = mode
                this.category = category
                this.owner = owner
            }.toCard()
        }

    override fun read(cardId: Int): Card? =
        transaction { CardEntity.findById(cardId)?.toCard() }

    override fun read(ownerName: String?): List<Card>? =
        transaction { ownerName?.let { findByName(ownerName)?.let { find(it.id) } } }

    override fun search(id: Int?, profession: String?, ownerName: String?): List<Card>? =
        transaction {
            when {
                id != null -> search(id)
                profession != null -> search(profession)
                ownerName != null -> findByName(ownerName)?.let { search(it.id) } ?: emptyList()
                else -> null
            }
        }

    override fun update(id: Int, company: String?, name: String?, phone: String?, email: String?, category: String?, mode: String?): Card? =
        transaction {
            val cardEntity = CardEntity.findById(id) ?: return@transaction null
            mode?.let { cardEntity.mode = it }
            company?.let { cardEntity.company = it }
            name?.let { cardEntity.name = it }
            phone?.let { cardEntity.phone = it }
            email?.let { cardEntity.email = it }
            category?.let { cardEntity.category = it }
            cardEntity.toCard()
        }

    override fun updatePath(card: Card, path: String): Card =
        transaction {
            val cardEntity = card.toCardEntity()
            cardEntity.path = path
            cardEntity.toCard()
        }
}