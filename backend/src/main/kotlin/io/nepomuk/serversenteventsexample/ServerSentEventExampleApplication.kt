package io.nepomuk.serversenteventsexample

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class ServerSentEventExampleApplication

fun main(args: Array<String>) {
	runApplication<ServerSentEventExampleApplication>(*args)
}
