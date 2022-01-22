package pishello.hello.persistence.database.ports

import org.springframework.stereotype.Component
import pishello.hello.persistence.database.entities.Card
import pishello.hello.persistence.database.repositories.CardRepository
import pishello.hello.persistence.database.repositories.UserRepository

@Component
class CardPort(val repository: CardRepository, val userRepository: UserRepository) {
    fun searchCards(id: Int?, profession: String?, ownerName: String?): List<Card>? {
        return when {
            id != null -> repository.searchById(id)
            profession != null -> repository.searchByProfession(profession)
            ownerName != null -> repository.searchByOwnerName(ownerName)
            else -> null
        }
    }

    fun searchOwnerCards(ownerName: String?): List<Card>? {
        return ownerName?.let { repository.findByOwner(it) }
    }

    fun findById(cardId: Int): Card? {
        return repository.findById(cardId)
    }

    fun createNewCard(userName: String, mode: String, category: String?): Card? {
        userRepository.findByName(userName) ?: return null
        val card = Card(0, mode, null, category, userName)
        return repository.save(card)
    }

    fun updateCard(id: Int, mode: String?, category: String?): Card? {
        val card = repository.findById(id) ?: return null
        if (mode != null)
            card.mode = mode
        if (category != null)
            card.category = category
        return repository.save(card)
    }

    fun setPath(card: Card, path: String): Card? {
        card.path = path
        return repository.save(card)
    }
}