package pishello.hello.persistence.database.entities

import org.hibernate.Hibernate
import javax.persistence.*

@Entity(name = "cards")
data class Card(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    var mode: String,
    var path: String?,
    var category: String?,
    val owner: String   // "FK"
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Card

        return id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String = this::class.simpleName + "(id = $id )"
}