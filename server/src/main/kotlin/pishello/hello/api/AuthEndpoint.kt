package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pishello.hello.database.Token
import pishello.hello.database.TokenConnection
import pishello.hello.database.UserConnection

data class LoginRequest(val name: String, val password: String)

@RestController
class AuthEndpoint(val userConnection: UserConnection, val tokenConnection: TokenConnection) {
    @GetMapping("/check")
    fun check(@RequestParam name: String): ResponseEntity<Unit> {
        return if (userConnection.checkIfUserExists(name)) {
            ResponseEntity(HttpStatus.CONFLICT)
        } else
            ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/register", consumes = ["application/json"])
    fun register(@RequestBody request: LoginRequest): ResponseEntity<Unit> {
        return if (!userConnection.checkIfUserExists(request.name)) {
            userConnection.createNewUser(request.name, request.password)
            ResponseEntity(HttpStatus.CREATED)
        } else
            ResponseEntity(HttpStatus.CONFLICT)
    }

    @PostMapping("/login", consumes = ["application/json"])
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Token> {
        val user = userConnection.checkLogin(request.name, request.password)
        return if (user != null) {
            val token = tokenConnection.createNewToken(user)
            ResponseEntity(token, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.FORBIDDEN)
    }

    @PostMapping("/loginWithGoogle", consumes = ["application/json"])
    fun google(@RequestBody request: LoginRequest): ResponseEntity<Token> {
        return if (!userConnection.checkIfUserExists(request.name)) {
            val user = userConnection.createNewUser(request.name, request.password)
            ResponseEntity(tokenConnection.createNewToken(user), HttpStatus.OK)
        } else {
            val user = userConnection.checkLogin(request.name, request.password)
            if (user != null) {
                ResponseEntity(tokenConnection.createNewToken(user), HttpStatus.OK)
            } else
                ResponseEntity(HttpStatus.FORBIDDEN)
        }
    }
}