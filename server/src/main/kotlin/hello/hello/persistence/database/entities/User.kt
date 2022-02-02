package hello.hello.persistence.database.entities

import org.hibernate.Hibernate
import javax.persistence.Entity
import javax.persistence.Id

@Entity(name = "users")
data class User(
    @Id val name: String,
    val password: String
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as User
        return name == other.name
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String = this::class.simpleName + "(name = $name )"
}