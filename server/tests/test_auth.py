def test_register_success(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": "newuser@querycore.io",
            "password": "SecurePassword123!",
            "fullName": "New Employee",
            "department": "Sales"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert "token" in data
    assert data["user"]["email"] == "newuser@querycore.io"
    assert data["user"]["department"] == "Sales"
    assert data["user"]["role"] == "member"

def test_register_duplicate_email_fails(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": "engineer@querycore.io",
            "password": "Password123!",
            "fullName": "Duplicate User",
            "department": "Engineering"
        }
    )
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]

def test_login_success(client):
    response = client.post(
        "/api/auth/login",
        json={
            "email": "engineer@querycore.io",
            "password": "Password123!"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert data["user"]["email"] == "engineer@querycore.io"

def test_login_invalid_password_fails(client):
    response = client.post(
        "/api/auth/login",
        json={
            "email": "engineer@querycore.io",
            "password": "WrongPassword!"
        }
    )
    assert response.status_code == 401
    assert "Invalid email or password" in response.json()["detail"]

def test_get_current_user_me(client, eng_token):
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {eng_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "engineer@querycore.io"
    assert data["department"] == "Engineering"

def test_get_me_unauthorized_fails(client):
    response = client.get("/api/auth/me")
    assert response.status_code == 401
