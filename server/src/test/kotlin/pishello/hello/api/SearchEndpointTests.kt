package pishello.hello.api

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import pishello.hello.TestUtilities

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class SearchEndpointTests(@Autowired val mockMvc: MockMvc) {

    val util = TestUtilities()

    @Test
    fun shouldSearchCardsById() {
        util.createUser(mockMvc)
        util.createCard(mockMvc)
        util.uploadPhotoCard(mockMvc)
        mockMvc
                .perform(MockMvcRequestBuilders.get("/search")
                        .param("id", "1"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().json(util.correctSearchByIdRequestData()))
    }
}