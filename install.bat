@echo off
REM Installation script pour SARPI AI ERP (Windows)

echo 🚀 Installation SARPI AI ERP
echo =============================

REM Créer les répertoires
echo.
echo 📁 Création des répertoires...
if not exist uploads mkdir uploads
if not exist storage mkdir storage
if not exist backups mkdir backups
if not exist logs mkdir logs
echo ✅ Répertoires créés

REM Copier la configuration
echo.
echo ⚙️  Configuration...
if not exist .env (
    copy .env.example .env
    echo ✅ Fichier .env créé. N'oubliez pas de le configurer!
) else (
    echo ✅ Fichier .env existe déjà
)

REM Installation avec Docker
echo.
echo 🐳 Démarrage avec Docker Compose...
where docker-compose >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    docker-compose up -d
    echo ✅ Application démarrée!
    echo.
    echo 📍 Accès:
    echo    - Frontend: http://localhost:3000
    echo    - API: http://localhost:8000
    echo    - Docs API: http://localhost:8000/docs
) else (
    echo.
    echo 📦 Installation des dépendances Python...
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    echo ✅ Dépendances installées
    echo.
    echo 🚀 Démarrage du serveur...
    echo Lancez dans des terminaux différents:
    echo    1. uvicorn backend.main:app --reload
    echo    2. cd frontend ^&^& npm install ^&^& npm start
)

echo.
echo ✅ Installation terminée!
pause
