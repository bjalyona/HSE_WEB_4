import { Button, Form, Input, type FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/api";
import "./RegisterPage.css";

type FieldType = {
  username: string;
  password: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await axios.post("/auth/register", {
        username: values.username,
        password: values.password,
      });
      const response = await axios.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      const token = response.data.token;
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        navigate("/profile");
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <div className="container">
      <div className="register-content">
        <h1 className="register-title">Регистрация</h1>
        <Form
          name="register"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginTop: 20 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: "Введите имя пользователя!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button color="purple" variant="solid" htmlType="submit">
              Зарегистрироваться
            </Button>
            <br />
            Уже есть аккаунт? <a href="/login">Войти</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
