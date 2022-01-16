package pishello.hello.persistence.database.ports

import org.springframework.stereotype.Component
import pishello.hello.persistence.database.entities.Card
import pishello.hello.persistence.database.repositories.CardRepository
import java.sql.Timestamp
import java.time.Instant
import java.util.*

@Component
class CardPort(val repository: CardRepository) {
    fun getCardsById(cardId: Int): List<Card> {
        return repository.findById(cardId)
    }
}