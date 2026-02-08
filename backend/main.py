from core.config import create_app
from routes.knowledge import router as knowledge_router

app = create_app()
app.include_router(knowledge_router)
