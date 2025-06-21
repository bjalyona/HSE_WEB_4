import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFanficById, fetchUsernameByUserId, likeArticle } from "../../services/api";
import type { Article } from "../../utils/types";
import './Reading.css'
import { HeartFilled} from "@ant-design/icons";

export default function Reading() {
  const { id } = useParams();
const [fanfic, setFanfic] = useState<Article>();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const fanficData = await fetchFanficById(id);
        setFanfic(fanficData);

        const name = await fetchUsernameByUserId(fanficData.userId);
        setUsername(name);
      } catch (err) {
        console.error("Ошибка при получении фанфика:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
        console.log(Number(id));
      await likeArticle(Number(id));
      alert("Лайк поставлен!");
    } catch (err) {
      console.error("Ошибка при постановке лайка:", err);
    }
  };

  if (!fanfic) return <div>Загрузка...</div>;

  return (
    <div className="container">
      <h1 className="reading-title">{fanfic.title}</h1>
      <p className="reading-author">Автор: {username}</p>
      <div className="like-container">
        <HeartFilled style={{margin: '20px auto'}} onClick={handleLike}/>
        
      </div>
      

      <div className="reading-text">{fanfic.content}</div>
      
    </div>
  );
}
