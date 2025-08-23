from pathlib import Path
from dotenv import load_dotenv
import os

# ===== Load .env =====
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# ===== Core =====
SECRET_KEY = os.getenv("SECRET_KEY", "CHANGE_ME")
DEBUG = os.getenv("DEBUG", "True").lower() in ("1", "true", "yes")

def csv_list(name: str, default: str = ""):
    raw = os.getenv(name, default)
    return [x.strip() for x in raw.split(",") if x.strip()]

# พอร์ตหน้าเว็บภายนอกตาม assignment (เริ่มต้น 10451)
EXTERNAL_WEB_PORT = os.getenv("EXTERNAL_WEB_PORT", "10451")

# Hosts / CSRF
ALLOWED_HOSTS = csv_list("ALLOWED_HOSTS", "localhost,127.0.0.1")

_env_csrf = csv_list("CSRF_TRUSTED_ORIGINS", "")
if _env_csrf:
    CSRF_TRUSTED_ORIGINS = _env_csrf
else:
    # สร้างจาก ALLOWED_HOSTS + EXTERNAL_WEB_PORT อัตโนมัติ
    CSRF_TRUSTED_ORIGINS = [f"http://{h}:{EXTERNAL_WEB_PORT}" for h in ALLOWED_HOSTS]

# ===== Apps =====
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",

    # optional
    "allauth",
    "allauth.account",
    "allauth.socialaccount",

    "myapp",
    "notifications",
]

SITE_ID = int(os.getenv("SITE_ID", "1"))

AUTHENTICATION_BACKENDS = (
    "allauth.account.auth_backends.AuthenticationBackend",
    "django.contrib.auth.backends.ModelBackend",
)

# ===== Middleware =====
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "project.wsgi.application"

# ===== Database (PostgreSQL) =====
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST", "db"),
        "PORT": int(os.getenv("DB_PORT", "5432")),
        "CONN_MAX_AGE": int(os.getenv("DB_CONN_MAX_AGE", "60")),
    }
}

# ===== I18N / TZ =====
LANGUAGE_CODE = "en-us"
TIME_ZONE = os.getenv("TIME_ZONE", "Asia/Bangkok")
USE_I18N = True
USE_TZ = os.getenv("USE_TZ", "False").lower() in ("1", "true", "yes")

# ===== Static / Media =====
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
_static_dir = BASE_DIR / "myapp" / "static"
STATICFILES_DIRS = [_static_dir] if _static_dir.exists() else []

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ===== Sessions =====
SESSION_ENGINE = "django.contrib.sessions.backends.db"
SESSION_COOKIE_NAME = "sessionid"

# ===== Custom User (ถ้ามีโมเดลจริง) =====
AUTH_USER_MODEL = os.getenv("AUTH_USER_MODEL", "myapp.CustomUser")

# ===== Upload limits =====
FILE_UPLOAD_HANDLERS = [
    "django.core.files.uploadhandler.MemoryFileUploadHandler",
    "django.core.files.uploadhandler.TemporaryFileUploadHandler",
]
FILE_UPLOAD_MAX_MEMORY_SIZE = 104857600
DATA_UPLOAD_MAX_MEMORY_SIZE = 104857600

# ===== Email =====
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True").lower() in ("1", "true", "yes")
EMAIL_USE_SSL = os.getenv("EMAIL_USE_SSL", "False").lower() in ("1", "true", "yes")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER or "webmaster@localhost")
SERVER_EMAIL = os.getenv("SERVER_EMAIL", DEFAULT_FROM_EMAIL)
