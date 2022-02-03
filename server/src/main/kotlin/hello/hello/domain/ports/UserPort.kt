package hello.hello.domain.ports

import hello.hello.domain.models.User

abstract class UserPort {
    abstract fun checkIfUserExists(username: String): Boolean

    abstract fun checkLogin(username: String, password: String): User?

    abstract fun createNewUser(argName: String, argPassword: String): User
}