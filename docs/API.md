# API Documentation - SARPI AI ERP

## Overview

SARPI AI ERP API est une API REST complète pour la gestion documentaire intelligente.

## Base URL

```
http://localhost:8000/api
```

## Authentication

Currently no authentication is required (can be added in production).

## Endpoints

### Documents

#### Upload Documents
```
POST /documents/upload

Parameters:
- files: List[UploadFile] - Files to upload
- project_id: int - Project ID

Response:
{
  "status": "success",
  "documents": [
    {"id": 1, "name": "document.pdf"}
  ]
}
```

#### List Documents
```
GET /documents/

Query Parameters:
- project_id: int - Project ID (required)
- discipline: str - Filter by discipline (optional)
- status: str - Filter by status (optional)

Response:
[
  {
    "id": 1,
    "file_name": "document.pdf",
    "document_title": "P&ID Area 22",
    "document_number": "24075-SAR-0010-P22-DG-00001",
    "discipline": "PIPING",
    "revision": "04",
    "status": "IFC",
    "created_at": "2024-01-01T00:00:00"
  }
]
```

#### Get Document Details
```
GET /documents/{document_id}

Response:
{
  "id": 1,
  "file_name": "document.pdf",
  "document_title": "P&ID Area 22",
  "document_number": "24075-SAR-0010-P22-DG-00001",
  "discipline": "PIPING",
  "revision": "04",
  "status": "IFC",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

### Projects

#### Create Project
```
POST /projects/

Body:
{
  "code": "TOUAT-P2",
  "name": "Touat Phase II",
  "description": "Oil & Gas Project",
  "client": "SONATRACH"
}

Response:
{
  "id": 1,
  "code": "TOUAT-P2",
  "name": "Touat Phase II",
  "status": "PLANNING",
  "created_at": "2024-01-01T00:00:00"
}
```

#### List Projects
```
GET /projects/

Response:
[
  {
    "id": 1,
    "code": "TOUAT-P2",
    "name": "Touat Phase II",
    "status": "PLANNING"
  }
]
```

#### Get Project
```
GET /projects/{project_id}

Response:
{
  "id": 1,
  "code": "TOUAT-P2",
  "name": "Touat Phase II",
  "status": "PLANNING",
  "created_at": "2024-01-01T00:00:00"
}
```

### Search

#### Simple Search
```
GET /search/documents

Query Parameters:
- q: str - Search query (required)
- project_id: int - Project ID (required)

Response:
[
  {
    "id": 1,
    "document_title": "P&ID Area 22",
    "document_number": "24075-SAR-0010-P22-DG-00001",
    "discipline": "PIPING"
  }
]
```

#### Intelligent Search
```
GET /search/intelligent

Query Parameters:
- query: str - Natural language query (required)
- project_id: int - Project ID (required)

Response:
[
  {
    "id": 1,
    "document_title": "P&ID Area 22",
    "relevance_score": 0.95
  }
]
```

### Dashboard

#### Dashboard Summary
```
GET /dashboard/summary

Query Parameters:
- project_id: int - Project ID (required)

Response:
{
  "project": {"id": 1, "name": "Touat Phase II"},
  "total_documents": 150,
  "by_discipline": [
    ["PIPING", 50],
    ["INSTRUMENTATION", 40],
    ["ELECTRICAL", 30]
  ],
  "by_status": [
    ["IFC", 100],
    ["DRAFT", 50]
  ]
}
```

#### Project KPIs
```
GET /dashboard/kpis

Query Parameters:
- project_id: int - Project ID (required)

Response:
[
  {
    "id": 1,
    "name": "Engineering Progress",
    "current_value": 75.5,
    "target_value": 80,
    "unit": "%"
  }
]
```

#### Project Alerts
```
GET /dashboard/alerts

Query Parameters:
- project_id: int - Project ID (required)

Response:
[
  {
    "id": 1,
    "alert_type": "SUPERSEDED_DOC",
    "severity": "WARNING",
    "message": "Document is superseded",
    "created_at": "2024-01-01T00:00:00"
  }
]
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Error Response

```json
{
  "detail": "Error message"
}
```

## Examples

### Upload PDF Documents
```bash
curl -X POST "http://localhost:8000/api/documents/upload?project_id=1" \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf"
```

### Search Documents
```bash
curl "http://localhost:8000/api/search/documents?q=P&ID&project_id=1"
```

### Get Dashboard Summary
```bash
curl "http://localhost:8000/api/dashboard/summary?project_id=1"
```
