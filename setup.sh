#!/bin/bash

echo "Setting up Air Compressor Dashboard System..."
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✓ All prerequisites are installed"

# Setup frontend
echo "Setting up frontend..."
cd frontend
npm install
echo "✓ Frontend dependencies installed"

# Setup backend
echo "Setting up backend..."
cd ../backend
python3 -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
pip install -r requirements.txt
echo "✓ Backend dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env 2>/dev/null || echo "Creating .env file..."
    echo "✓ .env file created"
fi

echo ""
echo "Setup completed successfully!"
echo "=========================="
echo "To start the system:"
echo "1. Start backend: cd backend && uvicorn main:app --reload"
echo "2. Start frontend: cd frontend && npm start"
echo ""
echo "Or run the start.bat script (Windows) or start.sh script (Linux/Mac)"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
