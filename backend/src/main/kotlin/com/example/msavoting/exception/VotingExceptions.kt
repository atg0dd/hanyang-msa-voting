package com.example.msavoting.exception

class InvalidEmailDomainException : RuntimeException("Email must be a hanyang.ac.kr address.")

class AlreadyVotedException : RuntimeException("This student has already voted.")

class InvalidCodeException : RuntimeException("The verification code is incorrect.")

class CodeExpiredException : RuntimeException("The verification code has expired.")

class TooManyAttemptsException : RuntimeException("Too many incorrect attempts. Request a new code.")

class ResendTooSoonException(val retryAfterSeconds: Long) :
    RuntimeException("Please wait before requesting another code.")
