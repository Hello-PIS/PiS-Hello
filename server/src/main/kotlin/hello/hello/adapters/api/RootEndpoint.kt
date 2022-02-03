package hello.hello.adapters.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RootEndpoint {
    @GetMapping
    fun index(): String = "Hello world"
}