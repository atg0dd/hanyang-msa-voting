package com.example.msavoting.service

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.stereotype.Service
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.time.Duration

interface MailService {
    fun send(toEmail: String, code: String)
}

/**
 * Sends over Brevo's HTTPS API rather than raw SMTP — Render's free tier blocks
 * outbound SMTP ports (25/465/587) entirely, so a JavaMailSender-based sender
 * would hang forever on every request from that host.
 */
@Service
@ConditionalOnProperty(name = ["app.mail.mode"], havingValue = "brevo")
class BrevoMailService(
    @Value("\${app.mail.brevo-api-key}") private val apiKey: String,
    @Value("\${app.mail.from-address}") private val fromAddress: String,
    @Value("\${app.mail.from-name}") private val fromName: String,
) : MailService {
    private val log = LoggerFactory.getLogger(BrevoMailService::class.java)
    private val client: HttpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(10))
        .build()

    override fun send(toEmail: String, code: String) {
        val body = """
            {
              "sender": {"name": "${escape(fromName)}", "email": "${escape(fromAddress)}"},
              "to": [{"email": "${escape(toEmail)}"}],
              "subject": "Your MSA Elections verification code",
              "textContent": "Your verification code is: $code\n\nThis code expires in 10 minutes. If you didn't request this, you can safely ignore this email."
            }
        """.trimIndent()

        val request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
            .timeout(Duration.ofSeconds(15))
            .header("accept", "application/json")
            .header("content-type", "application/json")
            .header("api-key", apiKey)
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build()

        val response = client.send(request, HttpResponse.BodyHandlers.ofString())
        if (response.statusCode() !in 200..299) {
            log.error("Brevo send failed: status={} body={}", response.statusCode(), response.body())
            throw IllegalStateException("Failed to send verification email (status ${response.statusCode()})")
        }
    }

    private fun escape(value: String) = value.replace("\\", "\\\\").replace("\"", "\\\"")
}

@Service
@ConditionalOnProperty(name = ["app.mail.mode"], havingValue = "console", matchIfMissing = true)
class ConsoleMailService : MailService {
    private val log = LoggerFactory.getLogger(ConsoleMailService::class.java)

    override fun send(toEmail: String, code: String) {
        log.info("[DEV MAIL] Verification code for {}: {}", toEmail, code)
    }
}
