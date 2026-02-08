from fastapi import Header, HTTPException, Request
from jose import jwt

def get_user_id(
    request: Request,
    authorization: str = Header(None, alias="Authorization"),
):
    if request.method == "OPTIONS":
        return None

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    try:
        token = authorization.split(" ")[1]
        payload = jwt.get_unverified_claims(token)
        return payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
