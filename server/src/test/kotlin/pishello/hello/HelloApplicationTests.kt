package pishello.hello

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.util.AssertionErrors.assertNotNull

@SpringBootTest
class HelloApplicationTests {
	@Test
	fun contextLoads() { }

	@Test
	fun appHasAGreeting() {
		assertNotNull("app should have a greeting", "please do an actual test here")
	}
}
