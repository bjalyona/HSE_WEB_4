import { HeartFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, Tag } from "antd";
import "./FanficLibrary.css";
import { useEffect, useState } from "react";
import axios from "../../../services/api";
import type { Article } from "../../../utils/types";
import { useNavigate } from "react-router-dom";

export default function FanficLibrary() {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/article")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Ошибка при загрузке фанфиков:", err));
  }, []);

  const handleReadClick = (id: number) => {
    navigate(`/library/${id}`);
  };

  return (
    <div className="container">
      <h2 className="list-title">Библиотека фанфиков</h2>
      <div className="fanfic-list">
        
        <Row >
          {articles.map((article) => (
            <Col span={8}>
              <Card
                key={article.id}
                title={article.title}
                extra={<Tag color="purple">{article.tag}</Tag>}
                style={{ width: 350, margin: '0 auto 16px auto'}}
              >
                {/* <p>by User {article.userId}</p> */}
                <p style={{ height: 90}}>{article.content.slice(0, 100)}...</p>
                <div className="actions-container">
                  <p>
                    <HeartFilled /> {article.likesCount}
                  </p>
                  <Button
                    color="purple" variant="solid"
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
