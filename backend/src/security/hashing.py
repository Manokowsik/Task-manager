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
    # 1. Try with SHA256 pre-hash (for users registered with current/new scheme)
    sha256_hash = hashlib.sha256(plain_password.encode()).hexdigest()
    try:
        if bcrypt.checkpw(
            sha256_hash.encode(),
            hashed_password.encode()
        ):
            return True
    except Exception:
        pass

    # 2. Try without SHA256 pre-hash (for legacy users registered with the old passlib/bcrypt scheme)
    try:
        if bcrypt.checkpw(
            plain_password.encode(),
            hashed_password.encode()
        ):
            return True
    except Exception:
        pass

    return False