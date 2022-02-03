package hello.hello.domain.ports

import hello.hello.domain.models.Card

abstract class CardPort {
    abstract fun searchCards(id: Int?, profession: String?, ownerName: String?): List<Card>?

    abstract fun searchOwnerCards(ownerName: String?): List<Card>?

    abstract fun findById(id: Int): Card?

    abstract fun createNewCard(userName: String, mode: String, category: String?): Card?

    abstract fun updateCard(id: Int, mode: String?, category: String?): Card?

    abstract fun setPath(card: Card, path: String): Card

    abstract fun updateData(id: Int, company: String?, name: String?, phone: String?, email: String?, category: String?, mode: String?): Card?
}