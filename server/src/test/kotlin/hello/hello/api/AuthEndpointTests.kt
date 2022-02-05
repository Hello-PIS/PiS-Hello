package hello.hello.api

import org.hamcrest.Matchers.containsString
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import hello.hello.TestUtilities

class AuthEndpointTests(@Autowired val mockMvc: MockMvc): TestUtilities() {

	@Test
	fun contextLoads() { }

	@Test
	fun shouldAcknowledgeThatThereIsNoSuchUser() {
		mockMvc.perform(get("/check")
				.param("name", correctUserName()))
			.andExpect(status().isOk)
	}

	@Test
	fun shouldRegisterUser() {
		mockMvc.perform(post("/register")
				.header("Content-Type", "application/json")
				.content(correctAuthRequestData()))
			.andExpect(status().isCreated)
	}

	@Test
	fun shouldAcknowledgeThatSuchUserAlreadyExists() {
		createUser(mockMvc)
		mockMvc.perform(get("/check")
				.param("name", correctUserName()))
			.andExpect(status().isConflict)
	}

	@Test
	fun shouldFailToRegisterTheSameUser() {
		createUser(mockMvc)
		mockMvc.perform(post("/register")
				.header("Content-Type", "application/json")
				.content(correctAuthRequestData()))
			.andExpect(status().isConflict)
	}

	@Test
	fun shouldLoginProperly() {
		createUser(mockMvc)
		mockMvc.perform(post("/login")
				.header("Content-Type", "application/json")
				.content(correctAuthRequestData()))
			.andExpect(status().isOk)
			.andExpect(content().string(containsString("token")))
	}

	@Test
	fun shouldFailToLogin() {
		createUser(mockMvc)
		mockMvc.perform(post("/login")
				.header("Content-Type", "application/json")
				.content(incorrectAuthRequestData()))
			.andExpect(status().isForbidden)
	}
}
