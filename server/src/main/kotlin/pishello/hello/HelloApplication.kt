package pishello.hello

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HelloApplication

fun main(args: Array<String>) {
	runApplication<HelloApplication>(*args)
//	val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
}
