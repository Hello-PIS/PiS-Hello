package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pishello.hello.persistence.database.entities.Token
import pishello.hello.persistence.database.ports.TokenPort
import pishello.hello.persistence.database.ports.UserPort

data class LoginRequest(val name: String, val password: String)

@RestController
class AuthEndpoint(val userPort: UserPort, val tokenPort: TokenPort) {
    @GetMapping("/check")
    fun check(@RequestParam name: String): ResponseEntity<Unit> {
        return if (userPort.checkIfUserExists(name)) {
            ResponseEntity(HttpStatus.CONFLICT)
        } else
            ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/register", consumes = ["application/json"])
    fun register(@RequestBody request: LoginRequest): ResponseEntity<Unit> {
        return if (!userPort.checkIfUserExists(request.name)) {
            userPort.createNewUser(request.name, request.password)
            ResponseEntity(HttpStatus.CREATED)
        } else
            ResponseEntity(HttpStatus.CONFLICT)
    }

    @PostMapping("/login", consumes = ["application/json"])
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Token> {
        val user = userPort.checkLogin(request.name, request.password)
        return if (user != null) {
            val token = tokenPort.createNewToken(user)
            ResponseEntity(token, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.FORBIDDEN)
    }

    @PostMapping("/loginWithGoogle", consumes = ["application/json"])
    fun google(@RequestBody request: LoginRequest): ResponseEntity<Token> {
        return if (!userPort.checkIfUserExists(request.name)) {
            val user = userPort.createNewUser(request.name, request.password)
            ResponseEntity(tokenPort.createNewToken(user), HttpStatus.OK)
        } else {
            val user = userPort.checkLogin(request.name, request.password)
            if (user != null) {
                ResponseEntity(tokenPort.createNewToken(user), HttpStatus.OK)
            } else
                ResponseEntity(HttpStatus.FORBIDDEN)
        }
    }
}