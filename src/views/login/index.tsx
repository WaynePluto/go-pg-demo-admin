import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/api/auth";
import { setToken, setRefreshToken } from "@/utils/auth";
import { message } from "antd";
import { MD5 } from "crypto-js";
import "./login-bg.scss";
import { postAuthLogin } from "@/apis/authApi";

export function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const payload = {
        username: values.username,
        password: MD5(values.password).toString(),
      };
      // const res = await authClient.login.$post({
      //   json: {
      //     username: values.username,
      //     password: MD5(values.password).toString(),
      //   },
      // });
      const res = await postAuthLogin(payload);
      const json = res?.data!;
      if (json.code === 200 && json.data) {
        setToken(json.data.access_token!);
        setRefreshToken(json.data.refresh_token!);
        messageApi.success("登录成功！");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        messageApi.error(json.msg || "登录失败，请重试！");
      }
    } catch (error) {
      messageApi.error("登录失败，请检查网络连接！");
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center relative overflow-hidden">
      {contextHolder}

      {/* 科技感背景元素 */}
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={
              {
                "--i": i,
                "--delay": `${i * 0.1}s`,
                "--size": `${Math.random() * 6 + 2}px`,
                "--left": `${Math.random() * 100}%`,
              } as React.CSSProperties
            }
          ></div>
        ))}
      </div>

      <div className="login-form-container relative z-10 w-full max-w-400px">
        <LoginForm
          title="后台管理系统"
          subTitle="欢迎登录"
          onFinish={handleSubmit}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/20 mb-12"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,245,255,0.95) 100%)",
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className="text-blue-500" />,
              className: "rounded-lg",
            }}
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: "用户名是必填项！",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className="text-blue-500" />,
              className: "rounded-lg",
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: "密码是必填项！",
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
}
