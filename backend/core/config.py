import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.genai import Client
from supabase import create_client, Client as SupabaseClient

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY missing in .env")

# Models
GEN_MODEL = "gemini-2.5-flash"
EMBED_MODEL = "gemini-embedding-001"
EMBED_DIM = 768

# Clients
genai_client = Client(api_key=GEMINI_API_KEY)

supabase: SupabaseClient = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
)

def create_app() -> FastAPI:
    app = FastAPI(title="Second Brain API")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000","https://second-brain-tau-blush.vercel.app"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
