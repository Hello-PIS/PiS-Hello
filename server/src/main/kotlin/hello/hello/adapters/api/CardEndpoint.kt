package hello.hello.adapters.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import hello.hello.adapters.persistence.cloudStorage.PhotosStorage
import hello.hello.adapters.persistence.database.adapters.CardAdapter
import hello.hello.domain.ports.CardPort

data class SetCardRequest(val id: Int, val company: String?, val name: String?, val phone: String?, val email: String?, val category: String?, val mode: String?)

@RestController
@RequestMapping("/card")
class CardEndpoint(val photosStorage: PhotosStorage) {
    val cardPort: CardPort = CardAdapter()

    @PostMapping
    fun putCard(@RequestParam image: MultipartFile, @RequestParam ownerName: String): ResponseEntity<Unit> {
        val card = cardPort.create(ownerName, "PRIVATE", null)
        return if (card != null) {
            photosStorage.writeImage("cards/${card.id}.jpg", image.bytes)
            cardPort.updatePath(card, "cards/${card.id}.jpg")
            ResponseEntity(HttpStatus.CREATED)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @GetMapping("/image", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getImage(@RequestParam id: Int): ResponseEntity<ByteArray?> {
        val result = cardPort.read(id)
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

    // TODO: change URI to /set
    @PostMapping("/changedata", consumes = ["application/json"])
    fun setCard(@RequestBody request: SetCardRequest): ResponseEntity<Unit> {
        val company: String? = request.company?.ifBlank { null }
        val name: String? = request.name?.ifBlank { null }
        val phone: String? = request.phone?.ifBlank { null }
        val email: String? = request.email?.ifBlank { null }
        val category: String? = request.category?.ifBlank { null }
        val mode: String? = request.mode?.ifBlank { null }

        return if (cardPort.update(request.id, company, name, phone, email, category, mode) != null) {
            ResponseEntity(HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }
}