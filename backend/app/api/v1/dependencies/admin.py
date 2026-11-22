from fastapi import Depends, HTTPException
from app.core.security import get_current_user
from app.models.entities import User

def admin_required(user: User = Depends(get_current_user)):
    """Dependency that ensures the caller is an admin.
    Raises HTTP 403 if not.
    """
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user
