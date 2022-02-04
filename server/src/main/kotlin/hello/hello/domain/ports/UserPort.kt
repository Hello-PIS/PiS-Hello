package hello.hello.domain.ports

import hello.hello.domain.models.User

abstract class UserPort {
    abstract fun create(argName: String, argPassword: String): User

    abstract fun checkIfUserExists(name: String): Boolean

    abstract fun checkLogin(name: String, password: String): User?
}