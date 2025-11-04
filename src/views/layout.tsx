import { LogoutOutlined, UserOutlined, TeamOutlined, FileOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { clearToken, isLogin } from "@/utils/auth";
import { message } from "antd";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = () => {
    clearToken();
    messageApi.success("退出登录成功！");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {contextHolder}
      <ProLayout
        layout="mix"
        title="后台管理系统"
        avatarProps={{
          icon: <UserOutlined />,
          title: isLogin() ? "管理员" : "未登录",
          size: "small",
          render: (_, dom) => <Dropdown menu={{ items: menuItems }}>{dom}</Dropdown>,
        }}
        menu={{
          request: async () => [
            {
              path: "/",
              name: "首页",
              icon: <UserOutlined />,
            },
            {
              path: "/template",
              name: "模板管理",
              icon: <FileOutlined />,
            },
            {
              path: "/user",
              name: "用户管理",
              icon: <TeamOutlined />,
            },
            {
              path: "/role",
              name: "角色管理",
              icon: <TeamOutlined />,
            },
            {
              path: "/permission",
              name: "权限管理",
              icon: <SafetyCertificateOutlined />,
            },
          ],
        }}
        onMenuHeaderClick={() => navigate("/")}
        menuItemRender={(item, dom) => <a onClick={() => navigate(item.path || "/")}>{dom}</a>}
      >
        {children}
      </ProLayout>
    </>
  );
}
