from fastapi import APIRouter, Depends, HTTPException
from core.config import supabase, genai_client, EMBED_MODEL, EMBED_DIM
from core.security import get_user_id
from models.schemas import KnowledgeItem, SearchQuery
from services.ai_service import process_content_with_ai

router = APIRouter()

@router.post("/capture")
async def capture_knowledge(
    item: KnowledgeItem,
    user_id: str = Depends(get_user_id),
):
    summary, auto_tags, embedding = await process_content_with_ai(item.content)

    data = {
        "user_id": user_id,
        "title": item.title,
        "content": item.content,
        "summary": summary,
        "tags": list(set(item.tags + auto_tags)),
        "embedding": embedding,
    }

    result = supabase.table("knowledge_items").insert(data).execute()
    return result.data


@router.post("/search")
async def semantic_search(
    query: SearchQuery,
    user_id: str = Depends(get_user_id),
):
    embed_res = genai_client.models.embed_content(
        model=EMBED_MODEL,
        contents=query.query,
        config={"output_dimensionality": EMBED_DIM},
    )

    query_embedding = embed_res.embeddings[0].values

    if len(query_embedding) != EMBED_DIM:
        raise HTTPException(status_code=500, detail="Embedding dimension mismatch")

    response = supabase.rpc(
        "match_knowledge_items",
        {
            "query_embedding": query_embedding,
            "match_threshold": 0.5,
            "match_count": 5,
        },
    ).execute()

    return response.data


@router.get("/public/brain/{user_id}")
async def public_brain_access(user_id: str):
    res = (
        supabase.table("knowledge_items")
        .select("id,title,summary,tags,created_at")
        .eq("user_id", user_id)
        .execute()
    )
    return res.data


@router.get("/health")
def health():
    return {"status": "ok"}
