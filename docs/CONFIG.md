# Configuration Guide - SARPI AI ERP

## Environment Variables

### Database Configuration

```bash
# SQLite (Development)
DATABASE_URL=sqlite:///./sarpi.db

# PostgreSQL (Production)
DATABASE_URL=postgresql://user:password@localhost:5432/sarpi_db

# Echo SQL queries (Debug)
DATABASE_ECHO=False
```

### API Configuration

```bash
# Host and port
API_HOST=0.0.0.0
API_PORT=8000

# Number of workers
API_WORKERS=4

# Debug mode
API_DEBUG=False
```

### Security Configuration

```bash
# Secret key for JWT tokens (change in production!)
SECRET_KEY=your-secret-key-here-change-in-production

# JWT algorithm
ALGORITHM=HS256

# Token expiration time (minutes)
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### AI & OCR Configuration

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-your-api-key-here

# OCR Engine (tesseract, pytesseract)
OCR_ENGINE=tesseract

# AI Model (gpt-4, gpt-3.5-turbo)
AI_MODEL=gpt-3.5-turbo
```

### File Upload Configuration

```bash
# Upload directory
UPLOAD_DIR=./uploads

# Maximum file size (bytes)
MAX_FILE_SIZE=104857600  # 100MB

# Allowed file extensions
ALLOWED_EXTENSIONS=pdf,doc,docx,xls,xlsx,dwg,dxf,jpg,png,zip,rar,txt,csv
```

### Storage Configuration

```bash
# Document storage path
STORAGE_PATH=./storage

# Backup path
BACKUP_PATH=./backups
```

### Logging Configuration

```bash
# Log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
LOG_LEVEL=INFO

# Log file path
LOG_FILE=./logs/sarpi.log
```

### Frontend Configuration

```bash
# API URL
REACT_APP_API_URL=http://localhost:8000

# Environment
REACT_APP_ENV=development  # or production
```

## Project Configuration

### Discipline Categories

Configurable disciplines for your project:

```json
[
  "PROCESS",
  "PIPING",
  "INSTRUMENTATION",
  "ELECTRICAL",
  "CIVIL",
  "MECHANICAL",
  "DOCUMENT_CONTROL",
  "VENDOR",
  "REPORTS"
]
```

### Document Categories

Document types for classification:

```json
[
  "P&ID",
  "PFD",
  "ISO",
  "MTO",
  "DATASHEET",
  "SPECIFICATION",
  "CALCULATION",
  "VENDOR_DOC",
  "DRAWING",
  "REPORT"
]
```

## Advanced Configuration

### Email Configuration (Optional)

```bash
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Redis Configuration (Cache)

```bash
REDIS_URL=redis://localhost:6379/0
REDIS_CACHE_TTL=3600
```

### CORS Configuration

Modify in `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Production Setup

### Security Best Practices

1. **Change Secret Key**
   ```bash
   # Generate a new secret key
   python -c "import secrets; print(secrets.token_urlsafe())"
   
   # Update .env
   SECRET_KEY=<generated-key>
   ```

2. **Use PostgreSQL**
   ```bash
   DATABASE_URL=postgresql://user:secure-password@secure-host/sarpi_db
   ```

3. **Enable HTTPS**
   - Configure SSL certificates
   - Use HTTPS only

4. **Configure CORS Properly**
   ```python
   allow_origins=["https://yourdomain.com"]
   ```

5. **Setup Authentication**
   - Implement user authentication
   - Setup role-based access control

6. **Enable Logging**
   ```bash
   LOG_LEVEL=INFO
   ```

### Docker Production Build

```bash
# Build production image
docker build -f docker/Dockerfile.backend -t sarpi-api:1.0.0 .

# Run production container
docker run -d \
  --name sarpi-api \
  -e DATABASE_URL=postgresql://... \
  -e API_DEBUG=False \
  -e SECRET_KEY=your-secret \
  -p 8000:8000 \
  sarpi-api:1.0.0
```

## Monitoring Configuration

### Health Checks

```bash
# Check API health
curl http://localhost:8000/health

# Response
{"status": "healthy"}
```

### Logging

Logs are stored in `logs/sarpi.log`:

```bash
# View logs
tail -f logs/sarpi.log

# Check specific errors
grep ERROR logs/sarpi.log
```

## Troubleshooting

### Configuration Issues

**Issue**: Settings not being applied

**Solution**:
1. Verify `.env` file exists
2. Check variable names are correct
3. Restart application
4. Check logs for errors

**Issue**: Database connection fails

**Solution**:
1. Verify DATABASE_URL format
2. Test database connectivity
3. Check credentials
4. Verify database exists

## Reference

- [Installation Guide](./INSTALLATION.md)
- [API Documentation](./API.md)
- [Architecture](./ARCHITECTURE.md)
