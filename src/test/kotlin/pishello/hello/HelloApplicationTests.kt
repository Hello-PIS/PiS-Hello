package pishello.hello

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.util.AssertionErrors.assertNotNull

@SpringBootTest
class HelloApplicationTests {
	@Autowired
	lateinit var messageResource: MessageResource

	@Test
	fun contextLoads() { }

	@Test fun appHasAGreeting() {
		assertNotNull("app should have a greeting", messageResource.index())
	}
}
