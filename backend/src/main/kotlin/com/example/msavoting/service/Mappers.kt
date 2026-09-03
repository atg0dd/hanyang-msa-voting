package com.example.msavoting.service

import com.example.msavoting.domain.CandidateInfo
import com.example.msavoting.dto.CandidateResponse

fun CandidateInfo.toResponse() = CandidateResponse(name = name, dept = dept, initials = initials)
