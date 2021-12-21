package pishello.hello.api

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import pishello.hello.cloudStorage.PhotosStorage


@RestController
class StorageEndpoint(val photosStorage: PhotosStorage) {
    @GetMapping("/text")
    fun text(): String? {
        photosStorage.writeText("Karo.txt", "a cookie monster")
        photosStorage.save("Karo.txt", "/tmp/hmm.txt")
        return photosStorage.readText("Karo.txt")
    }

    @GetMapping("/image", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun image(): ByteArray? {
        photosStorage.save("photos/business-card_1.jpg", "/tmp/hmm.jpg")
        return photosStorage.readImage("photos/business-card_1.jpg")
    }
}