import { useState } from "react";
import { HeaderAdmin } from "../../layout/admin/header";
import { NavbarAdmin } from "../../layout/admin/navbar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

export const AdminControl = () =>{
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
        <HeaderAdmin  props={{ setCollapsed, collapsed }}/>
        <Layout>
        <NavbarAdmin props={{collapsed}}/>
        <Outlet/>
        </Layout>
        </Layout>
    )

}