from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["version"] == "1.0.0"

def test_dashboard_overview():
    response = client.get("/api/v1/dashboard/overview")
    assert response.status_code == 200
    data = response.json()
    assert "metrics" in data
    assert "quick_stats" in data
    assert "top_opportunities" in data
    assert data["metrics"]["ai_credits_available"] >= 0

def test_billing_plans():
    response = client.get("/api/v1/billing/plans")
    assert response.status_code == 200
    plans = response.json()
    assert len(plans) >= 3
    tier_names = [p["tier"] for p in plans]
    assert "free" in tier_names
    assert "pro" in tier_names

def test_password_analyzer():
    response = client.post("/api/v1/cyber-hub/password-analyzer", json={"password": "Nexus#Secure2026"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_strong"] is True
    assert data["score"] >= 3
