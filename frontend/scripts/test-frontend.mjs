// Nexus AI Frontend & Backend Integration Verification Script
import assert from "node:assert";

const API_BASE = "http://127.0.0.1:8000/api/v1";

async function runTests() {
  console.log("=== Testing Nexus AI API Integration ===");

  // 1. Test Health
  const healthRes = await fetch("http://127.0.0.1:8000/health");
  assert.strictEqual(healthRes.status, 200, "Backend health should be 200");
  const health = await healthRes.json();
  console.log("✓ Backend is online:", health.status, "Environment:", health.environment);

  // 2. Test Dynamic Registration & Login (zero hardcoded secrets)
  const dynamicEmail = `test_runner_${Date.now()}@nexusai.dev`;
  const dynamicPassword = `TestSecurePass#${Date.now()}`;
  const dynamicName = "Test Verification Runner";

  const regRes = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: dynamicEmail, password: dynamicPassword, full_name: dynamicName }),
  });
  assert.strictEqual(regRes.status, 200, "Registration should succeed");
  const regData = await regRes.json();
  assert.ok(regData.access_token, "Access token must be present after register");
  console.log("✓ Dynamic registration succeeded for:", dynamicEmail);

  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: dynamicEmail, password: dynamicPassword }),
  });
  assert.strictEqual(loginRes.status, 200, "Login should succeed");
  const loginData = await loginRes.json();
  assert.ok(loginData.access_token, "Access token must be present after login");
  console.log("✓ Authentication login validated successfully");

  // 3. Test Dashboard Overview
  const overviewRes = await fetch(`${API_BASE}/dashboard/overview`);
  assert.strictEqual(overviewRes.status, 200, "Dashboard overview should return 200");
  const overview = await overviewRes.json();
  assert.ok(overview.metrics, "Metrics should be present");
  console.log("✓ Dashboard overview loaded. User:", overview.user_name, "Credits:", overview.metrics.ai_credits_available);

  // 4. Test LifeOS Tasks (GET & POST)
  const taskTitle = `Integration Test Task ${Date.now()}`;
  const createTaskRes = await fetch(`${API_BASE}/lifeos/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: taskTitle,
      priority: "high",
      estimated_minutes: 45,
    }),
  });
  assert.strictEqual(createTaskRes.status, 200, "Create task should return 200");
  const task = await createTaskRes.json();
  assert.strictEqual(task.title, taskTitle);
  console.log("✓ LifeOS task creation succeeded. ID:", task.id);

  // 5. Test CareerOS Skills
  const skillsRes = await fetch(`${API_BASE}/career/skills`);
  assert.strictEqual(skillsRes.status, 200, "Skills should return 200");
  const skills = await skillsRes.json();
  assert.ok(skills.length > 0, "Skills list should not be empty");
  console.log("✓ CareerOS skills loaded. Count:", skills.length);

  // 6. Test Cyber Hub Password Analyzer
  const pwdRes = await fetch(`${API_BASE}/cyber-hub/password-analyzer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "NexusSecure#2026!" }),
  });
  assert.strictEqual(pwdRes.status, 200, "Password analyzer should return 200");
  const pwdAnalysis = await pwdRes.json();
  assert.ok(pwdAnalysis.is_strong, "Strong password should be validated");
  console.log("✓ Cyber Hub Password Analyzer validated. Score:", pwdAnalysis.score);

  console.log("\nALL NEXUS AI FRONTEND-BACKEND INTEGRATION TESTS PASSED SUCCESSFULLY!");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
