from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import json
import pandas as pd
from io import BytesIO
import uuid

load_dotenv()

app = FastAPI(title="Air Compressor Dashboard API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# In-memory storage for mock data
mock_data = {
    "machines": [
        {
            "id": 1,
            "name": "AirCom-001",
            "status": "running",
            "pressure": 7.2,
            "flowRate": 150,
            "power": 45.5,
            "temperature": 65,
            "totalLoad": 85,
            "totalRun": 12450
        },
        {
            "id": 2,
            "name": "AirCom-002",
            "status": "stopped",
            "pressure": 0,
            "flowRate": 0,
            "power": 0,
            "temperature": 25,
            "totalLoad": 0,
            "totalRun": 8320
        },
        {
            "id": 3,
            "name": "AirCom-003",
            "status": "running",
            "pressure": 7.1,
            "flowRate": 145,
            "power": 44.2,
            "temperature": 63,
            "totalLoad": 82,
            "totalRun": 15680
        }
    ],
    "schedules": [
        {
            "id": 1,
            "name": "Morning Shift",
            "machine": "AirCom-001",
            "priority": 1,
            "startTime": "06:00",
            "endTime": "14:00",
            "days": ["Mon", "Tue", "Wed", "Thu", "Fri"],
            "minPressure": 6.5,
            "maxPressure": 7.5,
            "targetPressure": 7.0,
            "enabled": True
        },
        {
            "id": 2,
            "name": "Afternoon Shift",
            "machine": "AirCom-003",
            "priority": 2,
            "startTime": "14:00",
            "endTime": "22:00",
            "days": ["Mon", "Tue", "Wed", "Thu", "Fri"],
            "minPressure": 6.8,
            "maxPressure": 7.8,
            "targetPressure": 7.2,
            "enabled": True
        }
    ],
    "alarms": [
        {
            "id": 1,
            "type": "critical",
            "title": "High Pressure Alert",
            "message": "AirCom-001 pressure exceeds maximum threshold (8.2 bar)",
            "machine": "AirCom-001",
            "timestamp": "2026-05-07 14:35:22",
            "status": "active",
            "acknowledged": False
        },
        {
            "id": 2,
            "type": "warning",
            "title": "Temperature Warning",
            "message": "AirCom-003 temperature running high (78°C)",
            "machine": "AirCom-003",
            "timestamp": "2026-05-07 14:28:15",
            "status": "active",
            "acknowledged": True
        }
    ],
    "exports": []
}

# Pydantic models
class MachineData(BaseModel):
    id: int
    name: str
    status: str
    pressure: float
    flowRate: float
    power: float
    temperature: float
    totalLoad: float
    totalRun: float

class SensorData(BaseModel):
    pressureWet: Dict[str, Any]
    flowSensor: Dict[str, Any]
    dewPoint: Dict[str, Any]
    flowRateSummation: Dict[str, Any]
    powerMeter: Dict[str, Any]

class AlarmData(BaseModel):
    id: int
    type: str
    title: str
    message: str
    machine: str
    timestamp: str
    status: str
    acknowledged: bool

class ScheduleData(BaseModel):
    id: int
    name: str
    machine: str
    priority: int
    startTime: str
    endTime: str
    days: List[str]
    minPressure: float
    maxPressure: float
    targetPressure: float
    enabled: bool

class TimelineData(BaseModel):
    time: str
    machines: Dict[str, Dict[str, Any]]

# Helper functions
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # Simplified authentication - in production, implement proper JWT validation
    return {"username": "admin"}

# API Routes

@app.get("/")
async def root():
    return {"message": "Air Compressor Dashboard API", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Machine endpoints
@app.get("/api/machines", response_model=List[MachineData])
async def get_machines(current_user: dict = Depends(get_current_user)):
    """Get all air compressor machines data"""
    return mock_data["machines"]

@app.post("/api/machines/{machine_id}/toggle")
async def toggle_machine(machine_id: int, current_user: dict = Depends(get_current_user)):
    """Toggle machine on/off"""
    for machine in mock_data["machines"]:
        if machine["id"] == machine_id:
            machine["status"] = "stopped" if machine["status"] == "running" else "running"
            if machine["status"] == "running":
                machine["pressure"] = 7.1
                machine["flowRate"] = 140
                machine["power"] = 43.8
                machine["temperature"] = 62
                machine["totalLoad"] = 80
            else:
                machine["pressure"] = 0
                machine["flowRate"] = 0
                machine["power"] = 0
                machine["temperature"] = 25
                machine["totalLoad"] = 0
            return {"message": f"Machine {machine_id} toggled successfully", "status": "success"}
    
    raise HTTPException(status_code=404, detail="Machine not found")

@app.post("/api/machines/{machine_id}/start")
async def start_machine(machine_id: int, current_user: dict = Depends(get_current_user)):
    """Start machine"""
    for machine in mock_data["machines"]:
        if machine["id"] == machine_id:
            machine["status"] = "running"
            machine["pressure"] = 7.0
            machine["flowRate"] = 135
            machine["power"] = 42.5
            machine["temperature"] = 60
            machine["totalLoad"] = 78
            return {"message": f"Machine {machine_id} started successfully", "status": "success"}
    
    raise HTTPException(status_code=404, detail="Machine not found")

# Sensor endpoints
@app.get("/api/sensors", response_model=SensorData)
async def get_sensor_data(current_user: dict = Depends(get_current_user)):
    """Get all sensor data"""
    return {
        "pressureWet": {
            "current": 7.2,
            "unit": "bar",
            "status": "normal"
        },
        "flowSensor": {
            "current": 450,
            "unit": "m³/h",
            "status": "normal"
        },
        "dewPoint": {
            "current": 3.5,
            "unit": "°C",
            "status": "normal"
        },
        "flowRateSummation": {
            "current": 15420,
            "unit": "m³",
            "status": "normal"
        },
        "powerMeter": {
            "voltage": {
                "Ua": 230.5,
                "Ub": 231.2,
                "Uc": 229.8,
                "Uab": 400.2,
                "Ubc": 401.1,
                "Uca": 399.8
            },
            "current": {
                "Ia": 65.3,
                "Ib": 66.1,
                "Ic": 64.8
            },
            "power": {
                "kW": 45.2,
                "kWh": 1247.8
            }
        }
    }

# Energy endpoints
@app.get("/api/energy/consumption")
async def get_energy_consumption(current_user: dict = Depends(get_current_user)):
    """Get energy consumption data"""
    return {
        "currentPower": 47.3,
        "totalEnergyToday": 1135,
        "flowRate": 442,
        "efficiency": 84.5,
        "powerData": [
            {"time": "00:00", "power": 45.2, "flow": 420},
            {"time": "04:00", "power": 42.8, "flow": 395},
            {"time": "08:00", "power": 48.5, "flow": 452},
            {"time": "12:00", "power": 52.3, "flow": 485},
            {"time": "16:00", "power": 49.7, "flow": 463},
            {"time": "20:00", "power": 46.1, "flow": 428},
            {"time": "24:00", "power": 44.9, "flow": 415}
        ],
        "energyDistribution": [
            {"name": "AirCom-001", "value": 35, "color": "#3b82f6"},
            {"name": "AirCom-002", "value": 0, "color": "#ef4444"},
            {"name": "AirCom-003", "value": 40, "color": "#10b981"},
            {"name": "AirCom-004", "value": 25, "color": "#f59e0b"}
        ]
    }

# Schedule endpoints
@app.get("/api/schedules", response_model=List[ScheduleData])
async def get_schedules(current_user: dict = Depends(get_current_user)):
    """Get all schedules"""
    return mock_data["schedules"]

@app.post("/api/schedules")
async def create_schedule(schedule: ScheduleData, current_user: dict = Depends(get_current_user)):
    """Create new schedule"""
    new_id = max([s["id"] for s in mock_data["schedules"]]) + 1 if mock_data["schedules"] else 1
    schedule.id = new_id
    mock_data["schedules"].append(schedule.dict())
    return {"message": "Schedule created successfully", "schedule_id": new_id}

@app.put("/api/schedules/{schedule_id}")
async def update_schedule(schedule_id: int, schedule: ScheduleData, current_user: dict = Depends(get_current_user)):
    """Update schedule"""
    for i, s in enumerate(mock_data["schedules"]):
        if s["id"] == schedule_id:
            mock_data["schedules"][i] = schedule.dict()
            return {"message": "Schedule updated successfully"}
    
    raise HTTPException(status_code=404, detail="Schedule not found")

@app.delete("/api/schedules/{schedule_id}")
async def delete_schedule(schedule_id: int, current_user: dict = Depends(get_current_user)):
    """Delete schedule"""
    for i, s in enumerate(mock_data["schedules"]):
        if s["id"] == schedule_id:
            del mock_data["schedules"][i]
            return {"message": "Schedule deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Schedule not found")

# Timeline endpoints
@app.get("/api/timeline")
async def get_timeline_data(current_user: dict = Depends(get_current_user)):
    """Get timeline data"""
    return {
        "timelineData": [
            {
                "time": "00:00",
                "AirCom001": {"status": "running", "duration": 120, "color": "#10b981"},
                "AirCom002": {"status": "stopped", "duration": 0, "color": "#ef4444"},
                "AirCom003": {"status": "running", "duration": 120, "color": "#10b981"},
                "AirCom004": {"status": "stopped", "duration": 0, "color": "#ef4444"}
            },
            {
                "time": "04:00",
                "AirCom001": {"status": "running", "duration": 240, "color": "#10b981"},
                "AirCom002": {"status": "stopped", "duration": 0, "color": "#ef4444"},
                "AirCom003": {"status": "running", "duration": 240, "color": "#10b981"},
                "AirCom004": {"status": "stopped", "duration": 0, "color": "#ef4444"}
            }
        ]
    }

# Alarm endpoints
@app.get("/api/alarms", response_model=List[AlarmData])
async def get_alarms(current_user: dict = Depends(get_current_user)):
    """Get all alarms"""
    return mock_data["alarms"]

@app.post("/api/alarms/{alarm_id}/acknowledge")
async def acknowledge_alarm(alarm_id: int, current_user: dict = Depends(get_current_user)):
    """Acknowledge alarm"""
    for alarm in mock_data["alarms"]:
        if alarm["id"] == alarm_id:
            alarm["acknowledged"] = True
            return {"message": "Alarm acknowledged successfully"}
    
    raise HTTPException(status_code=404, detail="Alarm not found")

@app.post("/api/alarms/{alarm_id}/resolve")
async def resolve_alarm(alarm_id: int, current_user: dict = Depends(get_current_user)):
    """Resolve alarm"""
    for alarm in mock_data["alarms"]:
        if alarm["id"] == alarm_id:
            alarm["status"] = "resolved"
            return {"message": "Alarm resolved successfully"}
    
    raise HTTPException(status_code=404, detail="Alarm not found")

# Export endpoints
@app.post("/api/export")
async def export_data(
    module: str = "all",
    date_range: str = "7d",
    format: str = "csv",
    current_user: dict = Depends(get_current_user)
):
    """Export data in specified format"""
    export_id = str(uuid.uuid4())
    
    export_info = {
        "export_id": export_id,
        "module": module,
        "date_range": date_range,
        "format": format,
        "status": "processing",
        "estimated_size": "2.1 MB",
        "estimated_records": 15420
    }
    
    mock_data["exports"].append(export_info)
    
    return {
        "message": "Export job started",
        "export_id": export_id,
        "estimated_completion": "2 minutes"
    }

@app.get("/api/export/{export_id}/status")
async def get_export_status(export_id: str, current_user: dict = Depends(get_current_user)):
    """Get export job status"""
    for export_job in mock_data["exports"]:
        if export_job["export_id"] == export_id:
            return {
                "export_id": export_id,
                "status": export_job.get("status", "processing"),
                "progress": export_job.get("progress", 0),
                "download_url": export_job.get("download_url") if export_job.get("status") == "completed" else None
            }
    
    raise HTTPException(status_code=404, detail="Export job not found")

@app.get("/api/export/{export_id}/download")
async def download_export(export_id: str, current_user: dict = Depends(get_current_user)):
    """Download exported data"""
    return {"message": f"Download file for export {export_id}", "url": f"/downloads/{export_id}.csv"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
