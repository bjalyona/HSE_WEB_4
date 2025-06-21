import { Button, Form, Input, Select} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../../services/api";
import './CreateFanfic.css'

type Values = {
  title: string;
  text: string;
  tag: string;
};

export default function CreateFanfic() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const onFinish = async (values: Values) => {
    try {
      const newFanfic = await createArticle(values.title, values.text, values.tag);
      form.resetFields();
      navigate(`/library/${newFanfic.id}`);
    } catch (err) {
      console.error("Ошибка публикации:", err);
    }
  };

  if (!isAuth) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg">Для создания фанфика необходимо войти в аккаунт.</p>
        <Button type="primary" onClick={() => navigate("/login")} className="mt-4">
          Войти
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h2 className="create-title">Создать фанфик</h2>
      <Form
        form={form}
        scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: "Введите название фанфика" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tag"
          label="Жанр"
          rules={[{ required: true, message: "Выберите жанр" }]}
        >
          <Select placeholder="Выберите жанр">
            <Select.Option value="драма">Драма</Select.Option>
            <Select.Option value="повседневность">Повседневность</Select.Option>
            <Select.Option value="эротика">Приключения</Select.Option>
            <Select.Option value="драма">Романтика</Select.Option>
            <Select.Option value="повседневность">Научная фантастика</Select.Option>
            <Select.Option value="эротика">Ужасы</Select.Option>
            <Select.Option value="драма">Комедия</Select.Option>
            <Select.Option value="повседневность">Слэш</Select.Option>
            <Select.Option value="эротика">Параллельные вселенные</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="text"
          label="Текст фанфика"
          rules={[{ required: true, message: "Введите текст фанфика" }]}
        >
          <Input.TextArea rows={16} />
        </Form.Item>

        <Form.Item label={null} wrapperCol={{ offset: 6, span: 14 }}>
          <Button color="purple" variant="solid" htmlType="submit">
            Опубликовать
          </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  );
}
