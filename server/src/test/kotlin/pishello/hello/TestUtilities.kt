package pishello.hello

import org.springframework.core.io.ClassPathResource
import org.springframework.mock.web.MockMultipartFile
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

class TestUtilities {

    fun correctUserName() = "test_user"

    fun correctAuthRequestData(): String =
        """{ "name": "test_user", "password": "yes, this is a hash" }"""

    fun correctSearchByIdRequestData(): String =
        """[{"id":1, "mode":"PUBLIC", "path":"cards/1.jpg", "category":"lawyer", "owner":"test_user"}]"""

    fun incorrectAuthRequestData(): String =
        """{ "name": "test_user", "password": "no, this is not a hash" }"""

    fun correctAddCardRequestData(): String =
        """{ "userName": "test_user", "mode": "PUBLIC", "category": "lawyer"}"""

    fun createUser(mockMvc: MockMvc) {
        mockMvc.perform(MockMvcRequestBuilders.post("/register")
            .header("Content-Type", "application/json")
            .content(correctAuthRequestData()))
    }

    fun correctPutCardImageData(): MockMultipartFile =
        MockMultipartFile(
            "image", "photos-business-card.jpg",
            "image/jpeg", ClassPathResource("photos-business-card.jpg").file.readBytes()
        )

    fun uploadPhotoCard(mockMvc: MockMvc) {
        mockMvc.perform(MockMvcRequestBuilders.multipart("/card/image")
                .file(correctPutCardImageData())
                .param("id", "1"))

    }

    fun createCard(mockMvc: MockMvc) {
        mockMvc.perform(MockMvcRequestBuilders.post("/card")
            .header("Content-Type", "application/json")
            .content(correctAddCardRequestData()))
    }
}