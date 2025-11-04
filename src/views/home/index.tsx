import { Layout } from "../layout";

export function Home() {
  return (
    <Layout>
      <div className="home-page p-6">
        <h1 className="text-2xl font-bold mb-4">欢迎使用后台管理系统</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">数据统计卡片1</div>
          <div className="bg-white p-4 rounded shadow">数据统计卡片2</div>
          <div className="bg-white p-4 rounded shadow">数据统计卡片3</div>
        </div>
      </div>
    </Layout>
  );
}
