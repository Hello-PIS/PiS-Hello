package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pishello.hello.database.*

@RestController
class SearchEndpoint(val searchConnection: CardConnection) {
    @GetMapping("/search")
    fun search(@RequestParam id: Int): ResponseEntity<List<Card>> {
        val result = searchConnection.getCardsById(id)
        return if (result != null) {
            ResponseEntity(result, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.NOT_FOUND)
    }
}