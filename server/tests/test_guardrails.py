def test_department_guardrail_block_cross_dept_post(client, hr_token):
    # HR member attempting to create Engineering confidential doc
    response = client.post(
        "/api/documents",
        headers={"Authorization": f"Bearer {hr_token}"},
        json={
            "title": "Secret Engineering Blueprints",
            "department": "Engineering",
            "content": "Proprietary cluster specifications",
            "tags": ["Security"]
        }
    )
    assert response.status_code == 403
    assert "Department isolation guardrail prevents" in response.json()["detail"]

def test_admin_bypass_guardrail(client, admin_token):
    # Admin can post to any department
    response = client.post(
        "/api/documents",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "title": "Universal Policy",
            "department": "HR",
            "content": "Admin approved company-wide policy",
            "tags": ["Policy"]
        }
    )
    assert response.status_code == 201

def test_chat_cross_department_blocked(client, eng_token):
    response = client.post(
        "/api/chat",
        headers={"Authorization": f"Bearer {eng_token}"},
        json={
            "message": "Give me payroll numbers",
            "department": "HR"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["guardrail_status"] == "BLOCKED_CROSS_DEPT"
    assert "Access Denied" in data["answer"]
