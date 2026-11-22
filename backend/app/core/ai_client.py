import asyncio
from abc import ABC, abstractmethod
from typing import AsyncGenerator

class AIClient(ABC):
    """Abstract AI provider interface.
    Implementations must provide an async generator yielding response chunks.
    """

    @abstractmethod
    async def send(self, prompt: str, *, user_id: int) -> AsyncGenerator[str, None]:
        """Yield response chunks for a given prompt.
        The ``user_id`` is provided for future per‑user quota handling.
        """
        ...


class SandboxAIClient(AIClient):
    """A deterministic sandbox implementation used during development.
    It simply echoes the prompt with a prefix and streams the result word‑by‑word.
    No external network calls are made.
    """

    async def send(self, prompt: str, *, user_id: int) -> AsyncGenerator[str, None]:
        # Build a simple deterministic response
        response = f"[Sandbox] You said: {prompt}"
        # Stream word by word with a tiny delay to emulate real streaming
        for word in response.split():
            yield word + " "
            await asyncio.sleep(0.05)
