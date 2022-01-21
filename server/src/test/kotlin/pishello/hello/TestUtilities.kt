package pishello.hello

import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders


fun correctUserName() = "test_user"

fun correctAuthRequestData(): String =
    """{ "name": "test_user", "password": "yes, this is a hash" }"""

fun incorrectAuthRequestData(): String =
    """{ "name": "test_user", "password": "no, this is not a hash" }"""

fun correctAddCardRequestData(): String =
    """{ "userName": "test_user", "mode": "PUBLIC", "category": "lawyer" }"""

fun createUser(mockMvc: MockMvc) {
    mockMvc.perform(
        MockMvcRequestBuilders.post("/register")
        .header("Content-Type", "application/json")
        .content(correctAuthRequestData()))
}