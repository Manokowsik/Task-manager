import hashlib
import bcrypt


def hash_password(password: str) -> str:
    # Pre-hash with SHA256 to avoid bcrypt's 72-byte limit
    sha256_hash = hashlib.sha256(password.encode()).hexdigest()
    hashed = bcrypt.hashpw(
        sha256_hash.encode(), bcrypt.gensalt()
    )
    return hashed.decode()


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    # Pre-hash with SHA256 to match the stored hash
    sha256_hash = hashlib.sha256(plain_password.encode()).hexdigest()
    return bcrypt.checkpw(
        sha256_hash.encode(),
        hashed_password.encode()
    )