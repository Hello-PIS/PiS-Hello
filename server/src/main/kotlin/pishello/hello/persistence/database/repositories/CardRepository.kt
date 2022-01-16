package pishello.hello.persistence.database.repositories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import pishello.hello.database.Card


interface CardRepository: JpaRepository<Card?, String?> {

    @Query("SELECT * FROM CARD C WHERE C.ID = :id AND C.MODE = \"PUBLIC\"", nativeQuery = true)
    fun findById(@Param("id") id: Int?): List<Card>?
}