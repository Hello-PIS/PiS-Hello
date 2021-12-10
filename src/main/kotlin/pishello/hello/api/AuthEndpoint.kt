package pishello.hello.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import pishello.hello.database.Token
import pishello.hello.database.TokenConnection
import pishello.hello.database.UserConnection

data class LoginRequest(val name: String, val password: String)

@RestController
class AuthEndpoint(val userConnection: UserConnection, val tokenConnection: TokenConnection) {
    @PostMapping("/register")
    fun register(@RequestBody request: LoginRequest): ResponseEntity<Unit> {
        return if (!userConnection.checkIfUserExists(request.name)) {
            userConnection.createNewUser(request.name, request.password)
            ResponseEntity(HttpStatus.CREATED)
        } else
            ResponseEntity(HttpStatus.CONFLICT)
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Token> {
        val user = userConnection.checkLogin(request.name, request.password)
        return if (user != null) {
            val token = tokenConnection.createNewToken(user)
            ResponseEntity(token, HttpStatus.OK)
        } else
            ResponseEntity(HttpStatus.FORBIDDEN)
    }
}