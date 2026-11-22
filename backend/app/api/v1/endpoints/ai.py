from fastapi import APIRouter, Depends, HTTPException, status, Header
from fastapi.responses import StreamingResponse
from app.core.security import get_current_user
from app.core.ai_client import AIClient, SandboxAIClient
from typing import Callable

router = APIRouter()

# Dependency to enforce usage limits and credit deduction
from app.api.v1.dependencies.usage import enforce_usage_limits

# Dependency that returns the appropriate AI client (sandbox only for now)
def get_ai_client() -> AIClient:
    # In future this could read env vars to return different implementations
    return SandboxAIClient()

@router.post("/completion", summary="Get AI completion (sandbox)")
# Header imported at top – no inline import needed

async def completion(
    prompt: str,
    user=Depends(get_current_user),
    client: AIClient = Depends(get_ai_client),
    record_usage=Depends(enforce_usage_limits),
    request_id: str = Header(None, alias="X-Request-ID"),
):
    if not prompt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt cannot be empty")
    token_count = 0
    completed = False
    async def generator():
        nonlocal token_count, completed
        try:
            async for chunk in client.send(prompt, user_id=user.id):
                token_count += 1
                yield chunk
            completed = True
        except Exception:
            # stream failed or cancelled – do not mark completed
            completed = False
            raise
        finally:
            # Record usage only on successful completion
            if completed and token_count:
                record_usage(tokens=token_count, request_id=request_id)
    return StreamingResponse(generator(), media_type="text/event-stream")
    if not prompt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt cannot be empty")
    token_count = 0
    async def generator():
        nonlocal token_count
        try:
            async for chunk in client.send(prompt, user_id=user.id):
                token_count += 1  # simplistic token count per chunk
                yield chunk
        finally:
            # Record usage only if some tokens were generated
            if token_count:
                record_usage(tokens=token_count)
    return StreamingResponse(generator(), media_type="text/event-stream")
