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
    private fun searchById(id: Int): List<Card> =
        CardEntity.find { (CardTable.id eq id) and (CardTable.mode eq "PUBLIC") }.toList().map { it.toCard() }
    private fun searchByProfession(profession: String): List<Card> =
        CardEntity.find { (CardTable.category eq profession) and (CardTable.mode eq "PUBLIC") }.toList().map { it.toCard() }
    private fun searchByOwnerName(owner: EntityID<Int>): List<Card> =
        CardEntity.find { (CardTable.owner eq owner) and (CardTable.mode eq "PUBLIC") }.toList().map { it.toCard() }
    private fun findByOwner(owner: EntityID<Int>): List<Card> =
        CardEntity.find { CardTable.owner eq owner }.toList().map { it.toCard() }

    override fun searchCards(id: Int?, profession: String?, ownerName: String?): List<Card>? =
        transaction {
            when {
                id != null -> searchById(id)
                profession != null -> searchByProfession(profession)
                ownerName != null -> findByName(ownerName)?.let { searchByOwnerName(it.id) } ?: emptyList()
                else -> null
            }
        }

    override fun searchOwnerCards(ownerName: String?): List<Card>? =
        transaction { ownerName?.let { findByName(ownerName)?.let { findByOwner(it.id) } } }

    override fun findById(id: Int): Card? =
        transaction { CardEntity.findById(id)?.toCard() }

    override fun createNewCard(userName: String, mode: String, category: String?): Card? =
        transaction {
            val owner = findByName(userName) ?: return@transaction null
            CardEntity.new {
                this.mode = mode
                this.category = category
                this.owner = owner
            }.toCard()
        }

    override fun updateCard(id: Int, mode: String?, category: String?): Card? =
        transaction {
            val cardEntity = CardEntity.findById(id) ?: return@transaction null
            mode?.let { cardEntity.mode = it }
            category?.let { cardEntity.category = it }
            cardEntity.toCard()
        }

    override fun setPath(card: Card, path: String): Card =
        transaction {
            val cardEntity = card.toCardEntity()
            cardEntity.path = path
            cardEntity.toCard()
        }

    override fun updateData(id: Int, company: String?, name: String?, phone: String?, email: String?, category: String?, mode: String?): Card? =
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
}