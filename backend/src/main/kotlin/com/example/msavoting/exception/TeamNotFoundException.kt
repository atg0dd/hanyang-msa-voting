package com.example.msavoting.exception

class TeamNotFoundException(slug: String) : RuntimeException("Team not found: $slug")
