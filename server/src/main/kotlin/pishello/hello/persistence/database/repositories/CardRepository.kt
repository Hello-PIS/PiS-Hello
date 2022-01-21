package pishello.hello.persistence.database.repositories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import pishello.hello.persistence.database.entities.Card

interface CardRepository: JpaRepository<Card?, String?> {

    @Query("SELECT * FROM CARDS C WHERE C.ID = :id AND C.MODE = \"PUBLIC\"", nativeQuery = true)
    fun searchById(@Param("id") id: Int?): List<Card>?

    fun findById(id: Int): Card?
}