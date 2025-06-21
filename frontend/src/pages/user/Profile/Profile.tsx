import { Button, Card, Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/api";
import type { Article, User } from "../../../utils/types";
import { HeartFilled } from "@ant-design/icons";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get(`/auth/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        const resArticles = await axios.get(`/article/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(resArticles.data);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleReadClick = (id: number) => {
    navigate(`/library/${id}`);
  };

  if (!user) return <div>Загрузка...</div>;
  return (
    <div className="container">
      <div className="profile-info">
        <h2>{user.username}</h2>
        <Button
          color="purple"
          variant="outlined"
          onClick={handleLogout}
          style={{ marginLeft: 8 }}
        >
          Выйти
        </Button>
      </div>

      <h3 className="profile-list-title">Мои фанфики</h3>
      {articles.length === 0 && <p style={{textAlign: 'center'}}>Пока нет созданных фанфиков</p>}

      <div className="fanfic-list">
        <Row>
          {articles.map((article) => (
            <Col span={8}>
              <Card
                key={article.id}
                title={article.title}
                extra={<Tag color="purple">{article.tag}</Tag>}
                style={{ width: 350, margin: "0 auto 16px auto" }}
              >
                <p>by User {article.userId}</p>
                <p style={{ height: 90}}>{article.content.slice(0, 100)}...</p>
                <div className="actions-container">
                  <p>
                    <HeartFilled /> {article.likesCount}
                  </p>
                  <Button
                    color="purple"
                    variant="solid"
                    onClick={() => handleReadClick(article.id)}
                  >
                    Читать
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
