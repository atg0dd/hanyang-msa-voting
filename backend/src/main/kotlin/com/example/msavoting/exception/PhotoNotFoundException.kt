package com.example.msavoting.exception

class PhotoNotFoundException(slug: String, role: String) : RuntimeException("No photo for $role on team: $slug")
