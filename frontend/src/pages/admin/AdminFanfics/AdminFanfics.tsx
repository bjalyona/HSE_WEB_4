import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Col, Input, Modal, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  fetchAllFanfics,
  updateFanfic,
  deleteFanfic,
} from "../../../services/api";
import type { Article } from "../../../utils/types";
import "./AdminFanfics.css";

export default function AdminFanfics() {
  const [fanfics, setFanfics] = useState<Article[]>([]);
  const [editingFanfic, setEditingFanfic] = useState<Article | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTag, setEditTag] = useState("");

  useEffect(() => {
    loadFanfics();
  }, []);

  const loadFanfics = async () => {
    try {
      const data = await fetchAllFanfics();
      setFanfics(data);
    } catch (err) {
      console.error("Ошибка загрузки фанфиков:", err);
    }
  };

  const handleEdit = (fanfic: Article) => {
    setEditingFanfic(fanfic);
    setEditTitle(fanfic.title);
    setEditContent(fanfic.content);
    setEditTag(fanfic.tag);
  };

  const handleUpdate = async () => {
    if (!editingFanfic) return;
    try {
      await updateFanfic(editingFanfic.id, editTitle, editContent, editTag);
      setEditingFanfic(null);
      loadFanfics();
    } catch (err) {
      console.error("Ошибка обновления фанфика:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFanfic(id);
      loadFanfics();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="adminfan-title">Админ-панель: фанфики</h2>

      <div className="fanfic-list">
        <Row>
          {fanfics.map((article) => (
            <Col span={8}>
              <Card
                key={article.id}
                title={article.title}
                extra={<Tag color="purple">{article.tag}</Tag>}
                style={{ width: 350, margin: "0 auto 16px auto" }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => handleEdit(article)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDelete(article.id)}
                  />,
                ]}
              >
                <p>by User {article.userId}</p>
                <p>{article.content.slice(0, 100)}...</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title="Редактировать фанфик"
        open={!!editingFanfic}
        onCancel={() => setEditingFanfic(null)}
        onOk={handleUpdate}
        okText="Сохранить"
      >
        <Input
          placeholder="Название"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        <Input.TextArea
          placeholder="Текст фанфика"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={10}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Тег"
          value={editTag}
          onChange={(e) => setEditTag(e.target.value)}
        />
      </Modal>
    </div>
  );
}
