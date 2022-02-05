package hello.hello.api

import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.CsvSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import hello.hello.TestUtilities

class SearchEndpointTests(@Autowired val mockMvc: MockMvc): TestUtilities() {

    @ParameterizedTest
    @CsvSource("id,1", "profession,lawyer", "ownername,test_user")
    fun shouldSearchCardsByParam(paramName: String, paramValue: String) {
        createUser(mockMvc)
        createCard(mockMvc)
        setCard(mockMvc, 1, mode = "PUBLIC", category = "lawyer")
        mockMvc
                .perform(MockMvcRequestBuilders.get("/search")
                        .param(paramName, paramValue))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().json(correctSearchByIdRequestData()))
    }

    @Test
    fun shouldReturnUserCards() {
        createUser(mockMvc)
        createCard(mockMvc)
        setCard(mockMvc, 1, mode = "PUBLIC", category = "lawyer")
        mockMvc
                .perform(MockMvcRequestBuilders.get("/test_user/cards"))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andExpect(MockMvcResultMatchers.content().json(correctSearchByIdRequestData()))
    }
}