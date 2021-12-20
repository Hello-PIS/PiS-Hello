package pishello.hello.api

import org.springframework.web.bind.annotation.GetMapping
import pishello.hello.cloudStorage.PhotosStorage
import java.util.*


class StorageEndpoint {
    @GetMapping("/get_images")
    fun get_images(): HashMap<String, String> {
        val photosStorage = PhotosStorage()
        val bucket = photosStorage.createNewBucket("test")
        return photosStorage.downloadObject("strong-compiler-334811", "test", "pis2021/photos/business-card_1.jpg", "/")
    }
}