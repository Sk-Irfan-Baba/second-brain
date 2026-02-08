from fastapi import HTTPException
from google.genai.errors import ClientError
from core.config import (
    genai_client,
    GEN_MODEL,
    EMBED_MODEL,
    EMBED_DIM,
)

async def process_content_with_ai(text: str):
    prompt = (
        "Summarize this in one sentence and provide 3 relevant tags.\n"
        "Format: Summary | Tag1, Tag2, Tag3\n\n"
        f"Content: {text}"
    )

    try:
        response = genai_client.models.generate_content(
            model=GEN_MODEL,
            contents=prompt,
        )

        parts = response.text.split("|")
        summary = parts[0].strip()
        tags = [t.strip() for t in parts[1].split(",")] if len(parts) > 1 else []

        embedding_response = genai_client.models.embed_content(
            model=EMBED_MODEL,
            contents=text,
            config={"output_dimensionality": EMBED_DIM},
        )

        embedding = embedding_response.embeddings[0].values

        if len(embedding) != EMBED_DIM:
            raise RuntimeError("Embedding dimension mismatch")

        return summary, tags, embedding

    except ClientError:
        raise HTTPException(
            status_code=503,
            detail="AI service unavailable or quota exceeded",
        )
