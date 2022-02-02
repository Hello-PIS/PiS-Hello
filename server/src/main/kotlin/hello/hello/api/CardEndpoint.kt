package hello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import hello.hello.persistence.cloudStorage.PhotosStorage
import hello.hello.persistence.database.ports.CardPort

data class CardRequest(val id: Int, val mode: String?, val category: String?)
data class CardData(val id: Int, val company: String?, val name: String?, val phone: String?, val email: String?, val category: String?, val mode: String?)

@RestController
@RequestMapping("/card")
class CardEndpoint(val cardPort: CardPort, val photosStorage: PhotosStorage) {

    @PostMapping
    fun addCard(@RequestParam image: MultipartFile, @RequestParam ownerName: String): ResponseEntity<Unit> {
        val card = cardPort.createNewCard(ownerName, "PRIVATE", null)
        return if (card != null) {
            photosStorage.writeImage("cards/${card.id}.jpg", image.bytes)
            cardPort.setPath(card, "cards/${card.id}.jpg")
            ResponseEntity(HttpStatus.CREATED)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("/set")
    fun setCard(@RequestBody request: CardRequest): ResponseEntity<Unit> {
        return if (cardPort.updateCard(request.id, request.mode, request.category) != null) {
            ResponseEntity(HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @GetMapping("/image", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getImage(@RequestParam id: Int): ResponseEntity<ByteArray?> {
        val result = cardPort.findById(id)
        return if (result?.path != null) {
            val image = photosStorage.readImage(result.path!!)
            return if (image != null) {
                ResponseEntity(image, HttpStatus.OK)
            } else {
                ResponseEntity(HttpStatus.NOT_FOUND)
            }
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("/changedata", consumes = ["application/json"])
    fun editCard(@RequestBody request: CardData): ResponseEntity<Unit> {
        var company: String?
        var name: String?
        var phone: String?
        var email: String?
        var category: String?
        var mode: String?

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
        if (request.category ==""){
            category = null
        }
        else{
            category = request.category
        }
        if (request.mode ==""){
            mode = null
        }
        else{
            mode = request.mode
        }
        return if (cardPort.updateData(request.id, company, name, phone, email, category, mode) != null) {
            ResponseEntity(HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }
}