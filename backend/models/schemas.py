from typing import List, Optional
from pydantic import BaseModel

class KnowledgeItem(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = []

class SearchQuery(BaseModel):
    query: str
