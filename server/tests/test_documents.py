def test_list_documents(client, eng_token):
    response = client.get(
        "/api/documents",
        headers={"Authorization": f"Bearer {eng_token}"}
    )
    assert response.status_code == 200
    docs = response.json()
    assert len(docs) >= 2

def test_filter_documents_by_department(client, eng_token):
    response = client.get(
        "/api/documents?department=Engineering",
        headers={"Authorization": f"Bearer {eng_token}"}
    )
    assert response.status_code == 200
    docs = response.json()
    for doc in docs:
        assert doc["department"] == "Engineering"

def test_create_and_delete_document_success(client, eng_token):
    # Create doc in authorized department
    create_res = client.post(
        "/api/documents",
        headers={"Authorization": f"Bearer {eng_token}"},
        json={
            "title": "New Testing Doc",
            "department": "Engineering",
            "tags": ["Testing", "Pytest"],
            "content": "Automated pipeline documentation."
        }
    )
    assert create_res.status_code == 201
    doc_id = create_res.json()["id"]

    # Delete doc as creator
    del_res = client.delete(
        f"/api/documents/{doc_id}",
        headers={"Authorization": f"Bearer {eng_token}"}
    )
    assert del_res.status_code == 204
