# SARPI AI ERP - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SARPI AI ERP System                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         FRONTEND (React 18 + TypeScript)             │   │
│  │  - Dashboard                                         │   │
│  │  - Document Upload                                   │   │
│  │  - Search Interface                                  │   │
│  │  - Project Management                               │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     │ HTTP/REST                              │
│  ┌──────────────────▼───────────────────────────────────┐   │
│  │    API Gateway (FastAPI + Uvicorn)                   │   │
│  │  - Document Routes                                   │   │
│  │  - Project Routes                                    │   │
│  │  - Search Routes                                     │   │
│  │  - Dashboard Routes                                  │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     │                                        │
│  ┌──────────────────▼───────────────────────────────────┐   │
│  │        Business Logic Layer (Services)               │   │
│  │  - DocumentService                                   │   │
│  │  - ProjectService                                    │   │
│  │  - SearchService                                     │   │
│  │  - DashboardService                                  │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     │                                        │
│  ┌──────────────────┴───────────────┬────────────────────┐  │
│  │                                   │                    │  │
│  ▼                                   ▼                    ▼  │
│ ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐    │
│ │  Database   │  │  OCR/AI     │  │  File Storage    │    │
│ │  Layer      │  │  Processing │  │                  │    │
│ │             │  │             │  │  - uploads/      │    │
│ │ - SQLAlch.  │  │ - Tesseract │  │  - storage/      │    │
│ │ - Models    │  │ - OpenAI    │  │  - backups/      │    │
│ │ - Queries   │  │ - Embedding │  │                  │    │
│ └──────┬──────┘  └─────────────┘  └──────────────────┘    │
│        │                                                    │
│        ▼                                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Database (PostgreSQL / SQLite)                        │  │
│  │ - projects, documents, materials                      │  │
│  │ - document_metadata, areas, kpis                      │  │
│  │ - alerts, material_reservations                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Server**: Uvicorn
- **ORM**: SQLAlchemy
- **Database Drivers**: psycopg2 (PostgreSQL), sqlite3 (SQLite)

### Frontend
- **Framework**: React 18
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios/Fetch API
- **Charts**: Recharts

### AI/ML
- **OCR**: Tesseract, pytesseract
- **LLM**: OpenAI GPT-4/3.5-turbo
- **Embeddings**: Sentence-Transformers
- **Vector DB**: FAISS

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions (optional)

### Databases
- **Production**: PostgreSQL 14+
- **Development**: SQLite
- **Cache**: Redis (optional)

## Module Structure

```
backend/
├── api/
│   └── routes/
│       ├── documents.py    # Document endpoints
│       ├── projects.py     # Project endpoints
│       ├── materials.py    # Material endpoints
│       ├── search.py       # Search endpoints
│       └── dashboard.py    # Dashboard endpoints
├── models/
│   ├── document.py         # Document & metadata models
│   ├── project.py          # Project & area models
│   ├── material.py         # Material management models
│   └── dashboard.py        # Dashboard models (KPI, alerts)
├── services/
│   ├── document_service.py # Document processing
│   ├── ocr_service.py      # OCR operations
│   ├── ai_service.py       # AI classification
│   ├── search_service.py   # Search functionality
│   └── dashboard_service.py# Dashboard data aggregation
├── schemas/
│   ├── document.py         # Document schemas
│   └── project.py          # Project schemas
├── database.py             # Database configuration
└── main.py                 # Application entry point

config/
└── settings.py             # Configuration management

frontend/
├── src/
│   ├── pages/
│   │   └── Dashboard.jsx   # Dashboard page
│   ├── components/
│   │   ├── DocumentUpload.jsx
│   │   ├── DocumentSearch.jsx
│   │   └── ...
│   ├── App.jsx             # Root component
│   └── index.jsx           # Entry point
├── public/
│   └── index.html          # HTML template
└── package.json            # Dependencies
```

## Data Flow

### Document Upload Flow

```
1. User selects files (Frontend)
   ↓
2. Files sent to /api/documents/upload (API)
   ↓
3. Files saved to storage (File System)
   ↓
4. OCR extracts text (Tesseract)
   ↓
5. AI classifies document (OpenAI API)
   ↓
6. Metadata extracted and stored (Database)
   ↓
7. Document record created (Database)
   ↓
8. Response sent to frontend (JSON)
```

### Search Flow

```
1. User enters search query (Frontend)
   ↓
2. Query sent to /api/search/documents (API)
   ↓
3. Query matches against database (SQLAlchemy)
   ↓
4. Results ranked by relevance (Algorithm)
   ↓
5. Results returned to frontend (JSON)
```

### Dashboard Flow

```
1. User accesses dashboard (Frontend)
   ↓
2. Request to /api/dashboard/summary (API)
   ↓
3. Aggregate data from database (SQL Queries)
   ↓
4. Calculate KPIs (DashboardService)
   ↓
5. Retrieve alerts (Alert queries)
   ↓
6. Data formatted and returned (JSON)
   ↓
7. Dashboard rendered (React)
```

## Database Schema

### Key Tables

- **projects**: Project metadata and configuration
- **documents**: Document records with AI-extracted metadata
- **document_metadata**: Additional extracted metadata key-value pairs
- **materials**: Material inventory management
- **material_reservations**: Material allocation tracking
- **areas**: Project area/zone definitions
- **kpis**: Project Key Performance Indicators
- **alerts**: System alerts and notifications

### Relationships

```
Project ──┬─→ Document
          ├─→ Area
          └─→ KPI

Document ──→ DocumentMetadata
          ──→ MaterialReservation

Material ──→ MaterialReservation
```

## Security Architecture

### Authentication
- JWT token-based (can be extended)
- Access token management
- Token expiration

### Authorization
- Role-based access control (RBAC)
- Project-level permissions
- Document-level access control

### Data Protection
- Encrypted passwords
- Secure API endpoints
- CORS configuration
- SQL injection prevention (SQLAlchemy ORM)

## Scalability Considerations

### Horizontal Scaling
- Multiple Uvicorn workers
- Load balancer configuration
- Database connection pooling
- Redis caching layer

### Vertical Scaling
- Increase container resources
- Database optimization
- Index tuning
- Query optimization

### Performance Optimization
- Document caching
- Search indexing
- Query optimization
- Batch processing for large uploads

## Deployment Architecture

### Development
- Docker Compose with SQLite
- Hot reload enabled
- Debug mode on

### Production
- Docker containers (backend, frontend)
- PostgreSQL database
- Redis cache
- Reverse proxy (Nginx)
- SSL/TLS certificates
- Automated backups

## Monitoring & Logging

### Application Logs
- Level-based logging (DEBUG, INFO, WARNING, ERROR)
- File and console outputs
- Centralized log aggregation (optional)

### Health Checks
- API health endpoint
- Database connectivity
- External service availability

### Metrics
- Request latency
- Error rates
- Document processing time
- Database query performance

## Future Enhancements

- Real-time collaboration
- Advanced AI features
- Mobile application
- Advanced reporting
- Workflow automation
- Integration with ERP systems
