package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import pishello.hello.persistence.cloudStorage.PhotosStorage
import pishello.hello.persistence.database.ports.CardPort

data class CardRequest(val id: Int, val mode: String?, val category: String?)

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
}