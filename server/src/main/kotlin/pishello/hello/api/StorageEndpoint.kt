package pishello.hello.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import pishello.hello.cloudStorage.PhotosStorage


@RestController
class StorageEndpoint(val photosStorage: PhotosStorage) {
    @GetMapping("/text")
    fun text(): String? {
        photosStorage.write("Karo.txt", "a cookie monster")
        return photosStorage.read("Karo.txt")
    }

    @GetMapping("/save")
    fun save(): String {
        photosStorage.save("Karo.txt", "/tmp/hmm")
        return "OK"
    }
}