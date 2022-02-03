package hello.hello.api

import hello.hello.TestUtilities
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class RootEndpointTests(@Autowired val mockMvc: MockMvc): TestUtilities() {

	@Test
	fun contextLoads() { }

	@Test
	fun shouldReturnDefaultMessage() {
		mockMvc.perform(get("/"))
			.andExpect(status().isOk)
			.andExpect(content().string("Hello world"))
	}
}
