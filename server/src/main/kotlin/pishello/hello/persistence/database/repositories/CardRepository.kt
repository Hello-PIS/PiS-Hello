package pishello.hello.persistence.database.repositories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import pishello.hello.persistence.database.entities.Card

interface CardRepository: JpaRepository<Card?, String?> {

    @Query("SELECT * FROM CARDS C WHERE C.ID = :id AND C.MODE = :mode", nativeQuery = true)
    fun searchById(@Param("id") id: Int?, @Param("mode") mode: String? = "PUBLIC"): List<Card>?

    @Query("SELECT * FROM CARDS C WHERE C.CATEGORY= :profession AND C.MODE = :mode", nativeQuery = true)
    fun searchByProfession(@Param("profession") profession: String?, @Param("mode") mode: String? = "PUBLIC"): List<Card>?

    @Query("SELECT * FROM CARDS C WHERE C.OWNER= :ownerName AND C.MODE = :mode", nativeQuery = true)
    fun searchByOwnerName(@Param("ownerName") ownerName: String?, @Param("mode") mode: String? = "PUBLIC"): List<Card>?

    fun findByOwner(@Param("ownerName") ownerName: String):List<Card>?

    fun findById(id: Int): Card?
}