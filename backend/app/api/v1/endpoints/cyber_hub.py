from fastapi import APIRouter
from app.schemas.modules import PasswordCheckRequest, PasswordCheckResponse
import re

router = APIRouter()

@router.post("/password-analyzer", response_model=PasswordCheckResponse)
def analyze_password(req: PasswordCheckRequest):
    pwd = req.password
    score = 0
    feedback = []

    if len(pwd) >= 8:
        score += 1
    else:
        feedback.append("Password should be at least 8 characters long.")

    if re.search(r"[A-Z]", pwd):
        score += 1
    else:
        feedback.append("Include at least one uppercase letter.")

    if re.search(r"[0-9]", pwd):
        score += 1
    else:
        feedback.append("Include at least one number.")

    if re.search(r"[@$!%*?&#^()_\-+=\[\]{}|:;,<.>]", pwd):
        score += 1
    else:
        feedback.append("Include at least one special character.")

    # Crack time estimation
    crack_times = [
        "Instant (under 1 second)",
        "A few seconds to minutes",
        "A few hours to days",
        "Several months",
        "Centuries with current supercomputers"
    ]

    return PasswordCheckResponse(
        score=score,
        feedback=feedback if feedback else ["Excellent! High entropy detected."],
        is_strong=score >= 3,
        estimated_crack_time=crack_times[score]
    )
