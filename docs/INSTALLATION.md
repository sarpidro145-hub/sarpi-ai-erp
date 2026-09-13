# Installation Guide - SARPI AI ERP

## System Requirements

- Python 3.11 or higher
- Node.js 18 or higher (for frontend)
- Docker & Docker Compose (recommended)
- PostgreSQL 14+ (optional, SQLite for development)
- 2GB RAM minimum
- 500MB disk space

## Quick Start with Docker

### Prerequisites
- Docker installed ([Docker Desktop](https://www.docker.com/products/docker-desktop))
- Docker Compose (included in Docker Desktop)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sarpidro145-hub/sarpi-ai-erp.git
   cd sarpi-ai-erp
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file to set your configuration.

3. **Start the Application**
   ```bash
   docker-compose up -d
   ```

4. **Verify Installation**
   ```bash
   # Check containers
   docker-compose ps
   
   # View logs
   docker-compose logs -f backend
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Installation without Docker

### Backend Setup

1. **Create Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate.bat
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Initialize Database**
   ```bash
   python -c "from backend.database import init_db; init_db()"
   ```

5. **Start Backend Server**
   ```bash
   uvicorn backend.main:app --reload
   ```
   Backend will be available at http://localhost:8000

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   Frontend will be available at http://localhost:3000

## Automated Installation Scripts

### On Linux/macOS
```bash
chmod +x install.sh
./install.sh
```

### On Windows
```bash
install.bat
```

## Configuration

### Environment Variables

Edit `.env` file:

```bash
# Database (use SQLite for dev, PostgreSQL for prod)
DATABASE_URL=sqlite:///./sarpi.db
# DATABASE_URL=postgresql://user:password@localhost:5432/sarpi_db

# API Settings
API_HOST=0.0.0.0
API_PORT=8000
API_DEBUG=True

# AI Settings
OPENAI_API_KEY=your-api-key-here
AI_MODEL=gpt-3.5-turbo

# Security (change in production!)
SECRET_KEY=your-secret-key-here
```

## Database Setup

### Using SQLite (Development)
Default configuration, no setup needed.

### Using PostgreSQL (Production)

1. **Install PostgreSQL**
   ```bash
   # macOS
   brew install postgresql
   
   # Ubuntu
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Create Database**
   ```bash
   createdb sarpi_db
   psql sarpi_db
   
   # In psql:
   CREATE USER sarpi_user WITH PASSWORD 'sarpi_password';
   ALTER ROLE sarpi_user SET client_encoding TO 'utf8';
   ALTER ROLE sarpi_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE sarpi_user SET default_transaction_deferrable TO on;
   ALTER ROLE sarpi_user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE sarpi_db TO sarpi_user;
   ```

3. **Update .env**
   ```bash
   DATABASE_URL=postgresql://sarpi_user:sarpi_password@localhost:5432/sarpi_db
   ```

## Testing Installation

```bash
# Test API health
curl http://localhost:8000/health

# Test API docs
curl http://localhost:8000/docs

# Create a test project
curl -X POST http://localhost:8000/api/projects/ \
  -H "Content-Type: application/json" \
  -d '{"code": "TEST-001", "name": "Test Project", "client": "Test Client"}'
```

## Troubleshooting

### Port Already in Use

**Issue**: Port 8000 or 3000 is already in use

**Solution**:
```bash
# Change port in .env
API_PORT=8001

# Or kill process using port
# On macOS/Linux:
lsof -i :8000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database Connection Error

**Issue**: Cannot connect to database

**Solution**:
- Check DATABASE_URL in .env
- Verify PostgreSQL is running
- Check database credentials
- For SQLite, ensure file permissions

### Docker Issues

**Issue**: Docker containers won't start

**Solution**:
```bash
# View error logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Python Version Error

**Issue**: Python version incompatible

**Solution**:
```bash
# Check Python version
python3 --version

# Install Python 3.11+
# Visit https://www.python.org/downloads/
```

## Production Deployment

### Security Checklist

- [ ] Change SECRET_KEY in .env
- [ ] Set API_DEBUG=False
- [ ] Configure PostgreSQL
- [ ] Setup SSL/HTTPS
- [ ] Configure CORS properly
- [ ] Setup authentication
- [ ] Enable logging
- [ ] Setup backups

### Deployment Options

- **Heroku**: `git push heroku main`
- **AWS**: Use ECS/Fargate with RDS
- **Azure**: Use App Service with Database
- **DigitalOcean**: Use App Platform
- **Docker**: Deploy on any Docker-compatible infrastructure

## Support

If you encounter issues:

1. Check the [API Documentation](./API.md)
2. Review [Troubleshooting](#troubleshooting) section
3. Check Docker logs: `docker-compose logs`
4. Check application logs: `logs/sarpi.log`
5. Submit an issue on GitHub

## Next Steps

1. Create a project via API
2. Upload documents
3. Explore the dashboard
4. Configure AI settings for automatic classification
5. Setup material management
6. Configure KPIs
