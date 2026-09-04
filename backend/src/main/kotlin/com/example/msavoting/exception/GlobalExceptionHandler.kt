package com.example.msavoting.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(TeamNotFoundException::class, PhotoNotFoundException::class)
    fun handleTeamNotFound(ex: RuntimeException): ResponseEntity<Map<String, String>> =
        ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("error" to (ex.message ?: "Not found")))

    @ExceptionHandler(
        InvalidEmailDomainException::class,
        InvalidCodeException::class,
        CodeExpiredException::class,
        InvalidTeamDataException::class,
    )
    fun handleBadRequest(ex: RuntimeException): ResponseEntity<Map<String, String>> =
        ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("error" to (ex.message ?: "Bad request")))

    @ExceptionHandler(AlreadyVotedException::class)
    fun handleAlreadyVoted(ex: AlreadyVotedException): ResponseEntity<Map<String, String>> =
        ResponseEntity.status(HttpStatus.CONFLICT).body(mapOf("error" to (ex.message ?: "Already voted")))

    @ExceptionHandler(TooManyAttemptsException::class)
    fun handleTooManyAttempts(ex: TooManyAttemptsException): ResponseEntity<Map<String, String>> =
        ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(mapOf("error" to (ex.message ?: "Too many attempts")))

    @ExceptionHandler(ResendTooSoonException::class)
    fun handleResendTooSoon(ex: ResendTooSoonException): ResponseEntity<Map<String, Any>> =
        ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
            .body(mapOf("error" to (ex.message ?: "Too soon"), "retryAfterSeconds" to ex.retryAfterSeconds))
}
