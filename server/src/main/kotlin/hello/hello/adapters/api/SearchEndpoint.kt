package hello.hello.adapters.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import hello.hello.adapters.persistence.database.adapters.CardAdapter
import hello.hello.domain.models.Card

@RestController
class SearchEndpoint {
    val searchPort = CardAdapter()

    @GetMapping("/search")
    fun search(@RequestParam id: Int?, @RequestParam profession: String?, @RequestParam ownername: String?): ResponseEntity<Iterable<Card>> {
        val result = searchPort.searchCards(id, profession, ownername)
        return if (result != null) {
            ResponseEntity(result, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @GetMapping("/{user}/cards")
    fun getUserCards(@PathVariable user: String?): ResponseEntity<Iterable<Card>> {
        val result = searchPort.searchOwnerCards(ownerName = user)
        return if (result != null) {
            ResponseEntity(result, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.NOT_FOUND)
    }

}