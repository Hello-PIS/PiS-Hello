package hello.hello.api

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import hello.hello.TestUtilities

// TODO: change the bucket in GCS to not use the same as PROD

class CardEndpointTests(@Autowired val mockMvc: MockMvc): TestUtilities() {

    @Test
    fun shouldCreateCard() {
        createUser(mockMvc)
        mockMvc
            .perform(MockMvcRequestBuilders.multipart("/card")
                .file(correctPutCardImageData())
                .param("ownerName", correctUserName()))
            .andExpect(MockMvcResultMatchers.status().isCreated)
    }

    @Test
    fun shouldNotCreateCardForNonExistingUser() {
        mockMvc
            .perform(MockMvcRequestBuilders.multipart("/card")
                .file(correctPutCardImageData())
                .param("ownerName", correctUserName()))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun shouldSetCard() {
        createUser(mockMvc)
        createCard(mockMvc)
        mockMvc
            .perform(MockMvcRequestBuilders.post("/card/set")
                .header("Content-Type", "application/json")
                .content(correctSetRequestData(1, "company", "name", null, null, null, null)))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun shouldNotSetCardForNonExistingCard() {
        createUser(mockMvc)
        mockMvc
            .perform(MockMvcRequestBuilders.post("/card/set")
                .header("Content-Type", "application/json")
                .content(correctSetRequestData(1, "company", "name", null, null, null, null)))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }

    @Test
    fun shouldGetCardImage() {
        createUser(mockMvc)
        createCard(mockMvc)
        mockMvc
            .perform(MockMvcRequestBuilders.get("/card/image")
                .param("id", "1"))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun shouldNotGetCardImageForNonExistingCard() {
        createUser(mockMvc)
        mockMvc
            .perform(MockMvcRequestBuilders.get("/card/image")
                .param("id", "1"))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
    }
}