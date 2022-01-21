package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pishello.hello.persistence.database.entities.Card
import pishello.hello.persistence.database.ports.CardPort

@RestController
class SearchEndpoint(val searchConnection: CardPort) {
    @GetMapping("/search")
    fun search(@RequestParam id: Int): ResponseEntity<List<Card>> {
        val result = searchConnection.searchCardsById(id)
        return if (result != null) {
            ResponseEntity(result, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.NOT_FOUND)
    }
}