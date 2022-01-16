package pishello.hello.database

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param


interface CardRepository: JpaRepository<Card?, String?> {

    @Query("SELECT * FROM CARDS C WHERE C.ID = :id AND C.MODE = \"PUBLIC\"", nativeQuery = true)
    fun findById(@Param("id") id: Int?): List<Card>?


}