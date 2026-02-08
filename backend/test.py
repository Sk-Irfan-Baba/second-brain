import os
import asyncio
from dotenv import load_dotenv
from google.genai import Client

# 1. Load Environment Variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ Error: GEMINI_API_KEY not found in .env file.")
    exit()

print(f"🔑 Loaded API Key: {api_key[:10]}...")

# 2. Initialize Client
client = Client(api_key=api_key)

async def test_generation():
    print("\n--- 1. Testing Content Generation (Gemini 2.5 Flash) ---")
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents="Summarize 'The Matrix' movie in 5 words.",
        )
        print("✅ SUCCESS! Content generated:")
        print(f"   \"{response.text.strip()}\"")
        return True
    except Exception as e:
        print(f"❌ GENERATION FAILED: {e}")
        return False

async def test_embedding_768():
    print("\n--- 2. Testing Embeddings (768 Dimensions) ---")
    text_to_embed = "The quick brown fox jumps over the lazy dog."
    
    try:
        # Requesting 768 dimensions explicitly
        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=text_to_embed,
            config={
                "output_dimensionality": 768  # <--- FORCE 768 DIMENSIONS
            }
        )
        
        vector = response.embeddings[0].values
        dim_count = len(vector)
        
        print(f"✅ SUCCESS! Embedding generated.")
        print(f"   Vector dimensions: {dim_count}")
        
        if dim_count == 768:
            print("   🌟 PERFECT! Matches your DB requirement.")
            return True
        else:
            print(f"   ⚠️ WARNING: Expected 768, got {dim_count}.")
            return False
            
    except Exception as e:
        print(f"❌ EMBEDDING FAILED: {e}")
        return False

async def main():
    gen_success = await test_generation()
    embed_success = await test_embedding_768()
    
    if gen_success and embed_success:
        print("\n🎉 ALL SYSTEMS GO! Your API key is ready.")
    else:
        print("\n⚠️ SOME TESTS FAILED.")

if __name__ == "__main__":
    asyncio.run(main())