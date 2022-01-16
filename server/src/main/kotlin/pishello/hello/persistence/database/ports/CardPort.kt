package pishello.hello.persistence.database.ports

import org.springframework.stereotype.Component
import pishello.hello.persistence.database.entities.Card
import pishello.hello.persistence.database.repositories.CardRepository

@Component
class CardPort(val repository: CardRepository) {
    fun getCardsById(cardId: Int): List<Card>? {
        return repository.findById(cardId)
    }
}