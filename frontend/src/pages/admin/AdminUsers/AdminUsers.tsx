import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { fetchAllUsers, updateUser, deleteUser } from "../../../services/api";
import type { User } from "../../../utils/types";
import "./AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUsername, setEditUsername] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Ошибка загрузки пользователей:", err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditUsername(user.username);
  };

  const handleUpdate = async () => {
    try {
      if (!editingUser) return;
      await updateUser(editingUser.id, editUsername);
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="adminusers-title">Админ-панель: пользователи</h2>
      <div className="adminusers-list">
        {users.map((user) => (
          <Card
            key={user.id}
            actions={[
              <EditOutlined key="edit" onClick={() => handleEdit(user)} />,
              <DeleteOutlined
                key="delete"
                onClick={() => handleDelete(user.id)}
              />,
            ]}
            style={{ minWidth: 300, marginBottom: 16 }}
          >
            <Card.Meta
              avatar={<Avatar>{user.username[0]}</Avatar>}
              title={`ID: ${user.id}`}
              description={
                <>
                  <p>Username: {user.username}</p>
                </>
              }
            />
          </Card>
        ))}
      </div>

      <Modal
        title="Редактировать пользователя"
        open={!!editingUser}
        onCancel={() => setEditingUser(null)}
        onOk={handleUpdate}
        okText="Сохранить"
      >
        <Input
          placeholder="Username"
          value={editUsername}
          onChange={(e) => setEditUsername(e.target.value)}
          style={{ marginBottom: 8 }}
        />
      </Modal>
    </div>
  );
}
