package hello.hello.domain.ports

import hello.hello.domain.models.Token
import hello.hello.domain.models.User

abstract class TokenPort {
    abstract fun create(user: User): Token
}