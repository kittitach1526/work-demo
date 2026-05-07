@echo off
echo Starting Air Compressor Dashboard System...
echo.

echo Starting FastAPI Backend...
cd backend
start /B cmd /c "uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo Waiting for backend to start...
timeout /t 5

echo Starting React Frontend...
cd ../frontend
start /B cmd /c "npm start"

echo.
echo System is starting up...
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
pause
