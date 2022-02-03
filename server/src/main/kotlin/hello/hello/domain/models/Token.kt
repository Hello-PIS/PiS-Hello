package hello.hello.domain.models

import java.time.Instant
import java.util.UUID

data class Token(
    var token: UUID,
    val name: User,
    var creationDate: Instant
)