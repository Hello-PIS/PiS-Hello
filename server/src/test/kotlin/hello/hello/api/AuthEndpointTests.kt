package hello.hello.api

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
import hello.hello.TestUtilities


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class AuthEndpointTests(@Autowired val mockMvc: MockMvc) {

	val util = TestUtilities()

	@Test
	fun contextLoads() { }

	@Test
	fun shouldAcknowledgeThatThereIsNoSuchUser() {
		mockMvc.perform(get("/check")
				.param("name", util.correctUserName()))
			.andExpect(status().isOk)
	}

	@Test
	fun shouldRegisterUser() {
		mockMvc.perform(post("/register")
				.header("Content-Type", "application/json")
				.content(util.correctAuthRequestData()))
			.andExpect(status().isCreated)
	}

	@Test
	fun shouldAcknowledgeThatSuchUserAlreadyExists() {
		util.createUser(mockMvc)
		mockMvc.perform(get("/check")
				.param("name", util.correctUserName()))
			.andExpect(status().isConflict)
	}

	@Test
	fun shouldFailToRegisterTheSameUser() {
		util.createUser(mockMvc)
		mockMvc.perform(post("/register")
				.header("Content-Type", "application/json")
				.content(util.correctAuthRequestData()))
			.andExpect(status().isConflict)
	}

	@Test
	fun shouldLoginProperly() {
		util.createUser(mockMvc)
		mockMvc.perform(post("/login")
				.header("Content-Type", "application/json")
				.content(util.correctAuthRequestData()))
			.andExpect(status().isOk)
			.andExpect(content().string(containsString("token")))
	}

	@Test
	fun shouldFailToLogin() {
		util.createUser(mockMvc)
		mockMvc.perform(post("/login")
				.header("Content-Type", "application/json")
				.content(util.incorrectAuthRequestData()))
			.andExpect(status().isForbidden)
	}
}
