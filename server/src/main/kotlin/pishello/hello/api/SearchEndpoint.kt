package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pishello.hello.persistence.database.entities.Card
import pishello.hello.persistence.database.ports.CardPort

@RestController
class SearchEndpoint(val searchPort: CardPort) {
    @GetMapping("/search")
    fun search(@RequestParam id: Int?, @RequestParam profession: String?, @RequestParam ownername: String?): ResponseEntity<List<Card>> {
        val result = searchPort.searchCards(id, profession, ownername)
        return if (result != null) {
            ResponseEntity(result, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @GetMapping("/{user}/cards")
    fun getUserCards(@PathVariable user: String?): ResponseEntity<List<Card>> {
        val result = searchPort.searchOwnerCards(ownerName = user)
        return if (result != null) {
            ResponseEntity(result, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.NOT_FOUND)
    }
}