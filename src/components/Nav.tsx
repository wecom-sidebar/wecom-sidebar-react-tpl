import React, {FC} from "react";
import {Menu} from "antd";
import {HomeOutlined, SettingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const Nav: FC = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined/>}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="actions" icon={<SettingOutlined/>}>
        <Link to="/actions">操作</Link>
      </Menu.Item>
      <Menu.Item key="externalUser" icon={<SettingOutlined/>}>
        <Link to="/external-user">外部联系人</Link>
      </Menu.Item>
      <Menu.Item key="externalChat" icon={<SettingOutlined/>}>
        <Link to="/external-chat">外部联系群</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Nav;
