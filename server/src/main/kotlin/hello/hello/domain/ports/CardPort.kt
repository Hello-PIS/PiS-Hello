package hello.hello.domain.ports

import hello.hello.domain.models.Card

abstract class CardPort {
    abstract fun create(userName: String, mode: String, category: String?): Card?

    abstract fun read(cardId: Int): Card?

    abstract fun read(ownerName: String?): List<Card>?

    abstract fun search(id: Int?, profession: String?, ownerName: String?): List<Card>?

    abstract fun update(id: Int, company: String?, name: String?, phone: String?, email: String?, category: String?, mode: String?): Card?

    abstract fun updatePath(card: Card, path: String): Card
}