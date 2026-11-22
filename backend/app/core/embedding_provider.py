import abc
from typing import List, Any

class EmbeddingProvider(abc.ABC):
    """Abstract interface for embedding generation and similarity search."""

    @abc.abstractmethod
    def embed(self, text: str) -> List[float]:
        """Return a vector representation for a single piece of text."""
        pass

    @abc.abstractmethod
    def batch_embed(self, texts: List[str]) -> List[List[float]]:
        """Return embeddings for a list of texts."""
        pass

    @abc.abstractmethod
    def similarity(self, vec_a: List[float], vec_b: List[float]) -> float:
        """Compute similarity between two vectors (e.g., cosine)."""
        pass

    @abc.abstractmethod
    def search(self, query: str, candidates: List[Any], top_k: int = 5) -> List[Any]:
        """Return the top_k most similar candidates to the query.
        `candidates` is a list of objects that have an `embedding` attribute.
        """
        pass
