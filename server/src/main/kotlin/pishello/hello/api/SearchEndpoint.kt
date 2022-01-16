package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pishello.hello.database.Token
import pishello.hello.database.TokenConnection
import pishello.hello.database.UserConnection

@RestController
class SearchEndpoint(val searchConnection: CardConnection) {
    @GetMapping("/search")
    fun search(@RequestParam card: Int): ResponseEntity<Unit> {
        val result = searchConnection.getCardsById()
        return if (result != null) {
            ResponseEntity(result, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.NOT_FOUND)
    }
}