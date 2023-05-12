import { Outlet, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import Home from '../../assets/Home.png'
import User from '../../assets/User.png'
import Calendar from '../../assets/Calendar.png'
import PhanTich from '../../assets/PhanTich.png'
import addSpending from '../../assets/AddSpending.png'
import Logout from '../../assets/Logout.png'

import './Nav.css';

const Nav = () => {
    const { collapseSidebar} = useProSidebar();

    return (
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
            <div className='nav-bar col-2' style={{ height: "100vh", width: 'auto' }}>
                <Sidebar className="side-bar" style={{ height: "100vh" }}>
                    <Menu>
                        <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                        collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                        >
                        {" "}
                        </MenuItem>
                        <MenuItem 
                            icon={<img className="img-nav" src={Home}/>}
                            component={<Link to="home" />}
                            > Trang chủ </MenuItem>
                        <MenuItem 
                            icon={<img className="img-nav" src={addSpending}/>}
                            component={<Link to="addSpending" />}
                        > Thêm chi tiêu </MenuItem>
                        <MenuItem 
                            icon={<img className="img-nav" src={PhanTich}/>}
                            component={<Link to="analysis" />}
                        > Thống kê </MenuItem>
                        <SubMenu icon={<img className="img-nav" src={User}/>} label="Tài khoản">
                            <MenuItem
                                component={<Link to="accountinfor" />}
                            > Tài khoản</MenuItem>
                            <MenuItem> Ngôn ngữ </MenuItem>
                            <MenuItem
                                component={<Link to="history" />}
                            > Lịch sử </MenuItem>
                            <MenuItem> Xuất CSV </MenuItem>
                            <MenuItem
                                component={<Link to="currency" />}
                            > Tỷ giá </MenuItem>
                            <MenuItem> Thông tin </MenuItem>
                            <MenuItem
                            
                            > 
                            <p className="text-danger">Đăng xuất</p> 
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
            </div>
            <main className="col">
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default Nav