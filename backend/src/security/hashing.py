import hashlib
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password: str):
    # Pre-hash with SHA256 to avoid bcrypt's 72-byte limit
    sha256_hash = hashlib.sha256(password.encode()).hexdigest()
    return pwd_context.hash(sha256_hash)

def verify_password(
    plain_password,
    hashed_password
):
    # Pre-hash with SHA256 to match the stored hash
    sha256_hash = hashlib.sha256(plain_password.encode()).hexdigest()
    return pwd_context.verify(
        sha256_hash,
        hashed_password
    )