package com.example.msavoting.service

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

interface MailService {
    fun send(toEmail: String, code: String)
}

@Service
@ConditionalOnProperty(name = ["app.mail.mode"], havingValue = "smtp")
class SmtpMailService(
    private val mailSender: JavaMailSender,
    @Value("\${app.mail.from-address}") private val fromAddress: String,
    @Value("\${app.mail.from-name}") private val fromName: String,
) : MailService {
    override fun send(toEmail: String, code: String) {
        val message = SimpleMailMessage()
        message.setFrom("$fromName <$fromAddress>")
        message.setTo(toEmail)
        message.setSubject("Your MSA Elections verification code")
        message.setText(
            "Your verification code is: $code\n\nThis code expires in 10 minutes. " +
                "If you didn't request this, you can safely ignore this email."
        )
        mailSender.send(message)
    }
}

@Service
@ConditionalOnProperty(name = ["app.mail.mode"], havingValue = "console", matchIfMissing = true)
class ConsoleMailService : MailService {
    private val log = LoggerFactory.getLogger(ConsoleMailService::class.java)

    override fun send(toEmail: String, code: String) {
        log.info("[DEV MAIL] Verification code for {}: {}", toEmail, code)
    }
}
