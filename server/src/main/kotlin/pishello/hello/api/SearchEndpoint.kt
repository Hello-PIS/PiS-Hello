package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pishello.hello.persistence.database.entities.Card
import pishello.hello.persistence.database.ports.CardPort

data class CardData(val id: Int, val company: String?, val name: String?, val phone: String?, val email: String?)

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

    @PostMapping("/changedata", consumes = ["application/json"])
    fun setCard(@RequestBody request: CardData): ResponseEntity<Unit> {
        var company: String?
        var name: String?
        var phone: String?
        var email: String?
        if (request.company ==""){
            company = null
        }
        else{
            company = request.company
        }
        if (request.name ==""){
            name = null
        }
        else{
            name = request.name
        }
        if (request.phone ==""){
            phone = null
        }
        else{
            phone = request.phone
        }
        if (request.email ==""){
            email = null
        }
        else{
            email = request.email
        }
        return if (searchPort.updateData(request.id, company, name, phone, email) != null) {
            ResponseEntity(HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }
}