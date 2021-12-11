package pishello.hello.api

import org.hamcrest.Matchers.containsString
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class AuthEndpointTests(@Autowired val mockMvc: MockMvc) {

	@Test
	fun contextLoads() { }

	@Test
	fun shouldAcknowledgeThatThereIsNoSuchUser() {
		mockMvc
			.perform(get("/check")
				.param("name", getSampleUserName()))
			.andExpect(status().isOk)
	}

	@Test
	fun shouldRegisterUser() {
		mockMvc
			.perform(post("/register")
				.header("Content-Type", "application/json")
				.content(correctUserData()))
			.andExpect(status().isCreated)
	}

	@Test
	fun shouldAcknowledgeThatSuchUserAlreadyExists() {
		createSampleUser()
		this.mockMvc
			.perform(get("/check")
				.param("name", getSampleUserName()))
			.andExpect(status().isConflict)
	}

	@Test
	fun shouldFailToRegisterTheSameUser() {
		createSampleUser()
		this.mockMvc
			.perform(post("/register")
				.header("Content-Type", "application/json")
				.content(correctUserData()))
			.andExpect(status().isConflict)
	}

	@Test
	fun shouldLoginProperly() {
		createSampleUser()
		this.mockMvc
			.perform(post("/login")
				.header("Content-Type", "application/json")
				.content(correctUserData()))
			.andExpect(status().isOk)
			.andExpect(content().string(containsString("token")))
	}

	@Test
	fun shouldFailToLogin() {
		createSampleUser()
		this.mockMvc
			.perform(post("/login")
				.header("Content-Type", "application/json")
				.content(incorrectUserData()))
			.andExpect(status().isForbidden)
	}

	fun createSampleUser() {
		mockMvc.perform(post("/register")
				.header("Content-Type", "application/json")
				.content(correctUserData()))
	}

	fun getSampleUserName() = "test_user"

	fun correctUserData(): String =
		"""{ "name": "test_user", "password": "yes, this is a hash" }"""

	fun incorrectUserData(): String =
		"""{ "name": "test_user", "password": "no, this is not a hash" }"""
}
