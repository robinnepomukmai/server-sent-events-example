package io.nepomuk.serversenteventsexample.service

import io.nepomuk.serversenteventsexample.domain.Message
import io.nepomuk.serversenteventsexample.dto.MessageBody
import io.nepomuk.serversenteventsexample.dto.MessageView
import io.nepomuk.serversenteventsexample.repository.MessageRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import java.time.LocalDateTime

@Service
class MessageService(val messageRepository: MessageRepository) {
    fun findWithTailableCursorByRoom(room: String): Flux<MessageView> {
        return this.messageRepository.findWithTailableCursorByRoom(room)
                .map { it -> MessageView(it.text, "anonymous", LocalDateTime.now()) }
    }

    fun newMessage(messageBody: MessageBody) {
        this.messageRepository.save(Message(null, messageBody.text, messageBody.room)).subscribe()
    }
}
