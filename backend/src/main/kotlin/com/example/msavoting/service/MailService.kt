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
              "subject": "${escape(subject(code))}",
              "textContent": "${escape(textBody(code))}",
              "htmlContent": "${escape(htmlBody(code))}"
            }
        """.trimIndent()

        val request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.brevo.com/v3/smtp/email"))
            .timeout(Duration.ofSeconds(15))
            .header("accept", "application/json")
            .header("content-type", "application/json; charset=utf-8")
            .header("api-key", apiKey)
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build()

        val response = client.send(request, HttpResponse.BodyHandlers.ofString())
        if (response.statusCode() !in 200..299) {
            log.error("Brevo send failed: status={} body={}", response.statusCode(), response.body())
            throw IllegalStateException("Failed to send verification email (status ${response.statusCode()})")
        }
    }

    // Kept ASCII: non-ASCII text in email headers (From-name, Subject) needs RFC 2047
    // MIME encoding, which Brevo's API was not applying correctly — it was corrupting
    // the Cyrillic From-name into mojibake in the actual delivered email. The HTML/text
    // body below is unaffected since MIME body content declares its own UTF-8 charset.
    private fun subject(code: String) = "MSA Elections verification code: $code"

    private fun textBody(code: String) = """
        Таны баталгаажуулах код: $code

        Энэ код 10 минутын дараа хүчингүй болно.
        Хэрэв та энэ хүсэлтийг илгээгээгүй бол энэ имэйлийг үл тоомсорлож болно.

        — MSA Сонгууль
    """.trimIndent()

    private fun htmlBody(code: String) = """
        <div style="margin:0;padding:32px 16px;background-color:#F0F2FA;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:420px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
                  <tr>
                    <td style="background-color:#0B1220;padding:24px 32px;text-align:center;">
                      <span style="font-size:20px;">&#128499;&#65039;</span>
                      <div style="color:#ffffff;font-size:15px;font-weight:600;margin-top:4px;">MSA Сонгууль</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px;text-align:center;">
                      <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#0B1220;">Баталгаажуулах код</p>
                      <p style="margin:0 0 24px;font-size:14px;color:#5B6472;">Санал өгөхийн тулд доорх кодыг оруулна уу.</p>
                      <div style="display:inline-block;padding:16px 28px;background-color:#EEF2FF;border-radius:12px;font-size:32px;font-weight:700;letter-spacing:8px;color:#2952E3;">$code</div>
                      <p style="margin:24px 0 0;font-size:12px;color:#9AA3AF;">Энэ код 10 минутын дараа хүчингүй болно.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 32px;border-top:1px solid #EEF0F4;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#9AA3AF;">Хэрэв та энэ хүсэлтийг илгээгээгүй бол энэ имэйлийг үл тоомсорлож болно.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
    """.trimIndent()

    private fun escape(value: String) = value
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
        .replace("\r\n", "\\n")
        .replace("\n", "\\n")
        .replace("\t", "\\t")
}

@Service
@ConditionalOnProperty(name = ["app.mail.mode"], havingValue = "console", matchIfMissing = true)
class ConsoleMailService : MailService {
    private val log = LoggerFactory.getLogger(ConsoleMailService::class.java)

    override fun send(toEmail: String, code: String) {
        log.info("[DEV MAIL] Verification code for {}: {}", toEmail, code)
    }
}
