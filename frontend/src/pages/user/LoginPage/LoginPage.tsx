import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/api";
import "./LoginPage.css";

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
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
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-content">
        <h1 className="login-title">Войти</h1>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginTop: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите имя пользователя!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button color="purple" variant="solid" htmlType="submit">
              Войти
            </Button>
            <br />
            Нет аккаунта? <a href="/register">Зарегистрироваться</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
