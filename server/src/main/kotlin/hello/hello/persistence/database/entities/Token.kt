package hello.hello.persistence.database.entities

import org.hibernate.Hibernate
import java.sql.Timestamp
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity(name = "tokens")
data class Token(
    @Id
    val token: String,
    @ManyToOne
    @JoinColumn(name = "name")
    val name: User,
    val creationDate: Timestamp
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Token

        return token == other.token
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String = this::class.simpleName + "(token = $token )"
}