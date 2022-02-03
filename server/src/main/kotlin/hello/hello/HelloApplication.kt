package hello.hello

import hello.hello.adapters.persistence.database.init
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HelloApplication

fun main(args: Array<String>) {
	val context = runApplication<HelloApplication>(*args)
	init(context.environment)
}
