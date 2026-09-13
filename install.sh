#!/bin/bash
# Installation script pour SARPI AI ERP

echo "🚀 Installation SARPI AI ERP"
echo "============================="

# Vérifier les prérequis
echo "\n📋 Vérification des prérequis..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 n'est pas installé"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker n'est pas installé. Installation recommandée."
fi

echo "✅ Prérequis OK"

# Créer les répertoires
echo "\n📁 Création des répertoires..."
mkdir -p uploads storage backups logs

# Copier la configuration
echo "\n⚙️  Configuration..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Fichier .env créé. N'oubliez pas de le configurer!"
else
    echo "✅ Fichier .env existe déjà"
fi

# Installation avec Docker
echo "\n🐳 Démarrage avec Docker Compose..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
    echo "✅ Application démarrée!"
    echo "\n📍 Accès:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - API: http://localhost:8000"
    echo "   - Docs API: http://localhost:8000/docs"
else
    echo "\n📦 Installation des dépendances Python..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    echo "✅ Dépendances installées"
    echo "\n🚀 Démarrage du serveur..."
    echo "Lancez dans des terminaux différents:"
    echo "   1. uvicorn backend.main:app --reload"
    echo "   2. cd frontend && npm install && npm start"
fi

echo "\n✅ Installation terminée!"
