import os
from typing import Optional
import httpx
import asyncio
from fastapi import HTTPException
from app.core.ai_client import AIClient
from app.core.config import settings

class LLMProvider:
    async def generate(self, prompt: str, user_id: str):
        raise NotImplementedError

class OllamaProvider(LLMProvider):
    def __init__(self, model: str = "llama2"):
        self.base_url = "http://localhost:11434"
        self.model = model
        # simple health check when instantiated
        try:
            r = httpx.get(f"{self.base_url}/api/tags", timeout=2)
            if r.status_code != 200:
                raise RuntimeError
        except Exception:
            raise RuntimeError("Ollama not reachable")

    async def generate(self, prompt: str, user_id: str):
        async with httpx.AsyncClient(timeout=None) as client:
            try:
                async with client.stream("POST", f"{self.base_url}/api/generate", json={"model": self.model, "prompt": prompt, "stream": True}) as response:
                    async for line in response.aiter_lines():
                        if line:
                            yield line + "\n"
            except httpx.HTTPError as exc:
                raise HTTPException(status_code=502, detail=f"Ollama request failed: {exc}")

class SandboxProvider(LLMProvider):
    def __init__(self):
        self.client = AIClient()

    async def generate(self, prompt: str, user_id: str):
        async for chunk in self.client.send(prompt, user_id=user_id):
            yield chunk

def get_llm_provider() -> LLMProvider:
    """Select the best available LLM provider.
    Preference order: Ollama (if reachable) -> Sandbox.
    """
    ollama_model = os.getenv("OLLAMA_MODEL", getattr(settings, "OLLAMA_MODEL", "llama2"))
    try:
        return OllamaProvider(model=ollama_model)
    except Exception:
        return SandboxProvider()
