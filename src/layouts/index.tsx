import Loading from "@/components/loading";
import { getInfo } from "@/services/user";
import { useAppSelector } from "@/store";
import { setUserInfo } from "@/store/modules/user";
import { getToken } from "@/utils/auth";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import SiderBar from "./components/sider-bar";
import HeaderBar from "./components/header-bar";
import Footer from "@/components/footer";

export default function Layouts() {
  const { pathname } = useLocation();
  const { permissions } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    // 刷新时重新获取权限
    if (token && permissions && permissions.length === 0) {
      // IIFE方式调用异步接口获取用户信息和权限数据,存入store
      (async () => {
        const res = await getInfo();
        dispatch(setUserInfo(res.data));
        setLoading(false);
      })();
    }
  }, [pathname]);

  return loading ? (
    <Loading />
  ) : (
    <Layout className="w-full h-full !flex !flex-row !justify-between">
      <SiderBar />
      <Layout className="h-full">
        <HeaderBar />
        <Layout.Content className="w-full h-full px-3 pt-3 overflow-auto">
          <Outlet />
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
