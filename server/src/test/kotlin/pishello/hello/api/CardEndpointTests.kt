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
import pishello.hello.correctAddCardRequestData
import pishello.hello.createUser


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class CardEndpointTests(@Autowired val mockMvc: MockMvc) {

    @Test
    fun shouldReturnDefaultMessage() {
        createUser(mockMvc)
        mockMvc
            .perform(MockMvcRequestBuilders.post("/card")
                .header("Content-Type", "application/json")
                .content(correctAddCardRequestData()))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }
}