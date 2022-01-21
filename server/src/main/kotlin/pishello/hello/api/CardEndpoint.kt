package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import pishello.hello.persistence.cloudStorage.PhotosStorage
import pishello.hello.persistence.database.ports.CardPort

data class AddCardRequest(val userName: String, val mode: String?, val category: String?)

@RestController
@RequestMapping("/card")
class CardEndpoint(val cardPort: CardPort, val photosStorage: PhotosStorage) {

    @PostMapping
    fun addCard(@RequestBody request: AddCardRequest): ResponseEntity<Unit> {
        return if (cardPort.createNewCard(request.userName, request.mode ?: "PRIVATE", request.category) != null) {
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

    @PutMapping("/image")
    fun addImage(
        @RequestParam id: Int,
        @RequestParam image: MultipartFile
    ): ResponseEntity<Unit> {
        photosStorage.writeImage("cards/$id.jpg", image.bytes)
        return if (cardPort.setPath(id, "cards/$id.jpg") != null) {
            ResponseEntity(HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }
}