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

    fun findById(cardId: Int): Card? {
        return repository.findById(cardId)
    }

    fun createNewCard(userName: String, mode: String, category: String?): Card? {
        val user = userRepository.findByName(userName) ?: return null
        val card = Card(0, mode, null, category, user)
        return repository.save(card)
    }

    fun setPath(cardId: Int, path: String): Card? {
        val card = repository.findById(cardId) ?: return null
        card.path = path
        return repository.save(card)
    }
}