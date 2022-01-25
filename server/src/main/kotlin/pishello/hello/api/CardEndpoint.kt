package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import pishello.hello.persistence.cloudStorage.PhotosStorage
import pishello.hello.persistence.database.ports.CardPort

data class CardRequest(val id: Int, val mode: String?, val category: String?)
data class CardDataa(val id: Int, val company: String?, val name: String?, val phone: String?, val email: String?)

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
    fun setCard(@RequestBody request: CardDataa): ResponseEntity<Unit> {
        return if (cardPort.updateData(request.id, request.company, request.name, request.phone, request.email) != null) {
            ResponseEntity(HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
//        print("Do dinasours still exist?\n")
//        print("id ${request.id} \n company ${request.company} name ${request.name} phone ${request.phone} email ${request.email}")
//        val result = cardPort.findById(request.id)
//        return if (result != null) {
//            ResponseEntity(HttpStatus.OK)
//        } else {
//            ResponseEntity(HttpStatus.NOT_FOUND)
//        }


    }
}