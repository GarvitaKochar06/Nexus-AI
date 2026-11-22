import json
import math
import hashlib
from typing import List, Any

class LocalEmbeddingProvider:
    """Simple deterministic embedding using SHA-256 hash.
    Each text is hashed to a 32‑byte digest; the bytes are treated as a vector.
    Similarity is cosine similarity of the byte vectors.
    """

    def _hash_to_vec(self, text: str) -> List[int]:
        digest = hashlib.sha256(text.encode("utf-8")).digest()
        return list(digest)  # 32 ints 0‑255

    def embed(self, text: str) -> List[int]:
        return self._hash_to_vec(text)

    def batch_embed(self, texts: List[str]) -> List[List[int]]:
        return [self._hash_to_vec(t) for t in texts]

    def similarity(self, vec_a: List[int], vec_b: List[int]) -> float:
        # cosine similarity
        dot = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = math.sqrt(sum(a * a for a in vec_a))
        norm_b = math.sqrt(sum(b * b for b in vec_b))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot / (norm_a * norm_b)

    def search(self, query: str, candidates: List[Any], top_k: int = 5) -> List[Any]:
        q_vec = self.embed(query)
        # each candidate must have attribute 'embedding' (list of ints)
        scored = []
        for cand in candidates:
            if not getattr(cand, "embedding", None):
                continue
            sim = self.similarity(q_vec, cand.embedding)
            scored.append((sim, cand))
        scored.sort(key=lambda x: x[0], reverse=True)
        return [c for _, c in scored[:top_k]]
