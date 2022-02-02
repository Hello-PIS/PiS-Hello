package hello.hello.api

import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.CsvSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import hello.hello.TestUtilities

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class SearchEndpointTests(@Autowired val mockMvc: MockMvc) {

    val util = TestUtilities()

    @ParameterizedTest
    @CsvSource("id,1", "profession,lawyer", "ownername,test_user")
    fun shouldSearchCardsByParam(paramName: String, paramValue: String) {
        util.createUser(mockMvc)
        util.createCard(mockMvc)
        util.setCard(mockMvc, 1, "PUBLIC", "lawyer")
        mockMvc
                .perform(MockMvcRequestBuilders.get("/search")
                        .param(paramName, paramValue))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().json(util.correctSearchByIdRequestData()))
    }

    @Test
    fun shouldReturnUserCards() {
        util.createUser(mockMvc)
        util.createCard(mockMvc)
        util.setCard(mockMvc, 1, "PUBLIC", "lawyer")
        mockMvc
                .perform(MockMvcRequestBuilders.get("/test_user/cards"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().json(util.correctSearchByIdRequestData()))
    }
}