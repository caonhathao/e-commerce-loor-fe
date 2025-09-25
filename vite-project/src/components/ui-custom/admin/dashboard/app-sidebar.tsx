import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import avatar from "../../../../assets/img/loli.png";
import { Avatar, IconButton, Link } from "@mui/material";
import { BsThreeDots } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { GiSellCard } from "react-icons/gi";
import {
  FaReceipt,
  FaUserFriends,
  FaListUl,
  FaRegistered,
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { HiReceiptTax } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaListCheck } from "react-icons/fa6";
import { RiFlashlightFill } from "react-icons/ri";
import { AiOutlineGlobal } from "react-icons/ai";
import { TbTruckReturn } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiSupport } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import { IoChatboxEllipsesSharp } from "react-icons/io5";

const dashboard = {
  label: "Dashboard",
  icon: <MdSpaceDashboard />,
  link: "/admin/dashboard",
};

const management = [
  {
    label: "Seller Management",
    icon: <GiSellCard />,
    children: [
      {
        label: "Danh sách Sellers",
        icon: <FaListUl />,
        link: "/admin/sellers",
      },
      {
        label: "Yêu cầu đăng ký",
        icon: <FaRegistered />,
        link: "/admin/sellers/requests",
      },
    ],
  },

  {
    label: "User Management",
    icon: <FaUserFriends />,
    children: [
      { label: "Danh sách Users", icon: <FaListUl />, link: "/admin/users" },
      {
        label: "Báo cáo / Vi phạm",
        icon: <MdReportProblem />,
        link: "/admin/users/reports",
      },
    ],
  },

  {
    label: "Product Management",
    icon: <AiFillProduct />,
    children: [
      {
        label: "Danh sách Sản phẩm",
        icon: <FaListUl />,
        link: "/admin/products",
      },
      {
        label: "Danh mục / Ngành hàng",
        icon: <BiSolidCategory />,
        link: "/admin/category",
      },
      {
        label: "Kiểm duyệt sản phẩm",
        icon: <FaListCheck />,
        link: "/admin/products/review",
      },
    ],
  },

  {
    label: "Order Management",
    icon: <FaReceipt />,
    children: [
      { label: "Tất cả Đơn hàng", icon: <FaListUl />, link: "/admin/orders" },
      {
        label: "Hoàn hàng / Khiếu nại",
        icon: <TbTruckReturn />,
        link: "/admin/orders/returns",
      },
    ],
  },

  {
    label: "Promotion / Voucher",
    icon: <HiReceiptTax />,
    children: [
      {
        label: "Flash Sale",
        icon: <RiFlashlightFill />,
        link: "/admin/promotions/flashsale",
      },
      {
        label: "Voucher Toàn sàn",
        icon: <AiOutlineGlobal />,
        link: "/admin/promotions/vouchers",
      },
    ],
  },
];

const others = [
  { label: "Reports", icon: <BiSolidReport />, link: "/admin/reports" },
  { label: "Supports", icon: <BiSupport />, link: "/admin/supports" },
  {
    label: "Notification Center",
    icon: <IoChatboxEllipsesSharp />,
    link: "/admin/notification-center",
  },
];

const AppSidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openNestedIndex, setOpenNestedIndex] = useState<boolean[]>(
    Array(management.length).fill(false)
  );

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNested = (index: number) => {
    const newOpenNestedIndex = [...openNestedIndex];
    newOpenNestedIndex[index] = !newOpenNestedIndex[index];
    setOpenNestedIndex(newOpenNestedIndex);
  };

  return (
    <Box
      component={"section"}
      sx={{
        width: "250px",
        height: "100vh",
        bgcolor: "hsl(var(--sidebar-background))",
        p: 1,
        overflowY: "auto",
      }}
    >
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar alt="Admin Avatar" src={avatar}>
              R
            </Avatar>
          }
          title="ICMK.Inc"
          action={
            <IconButton
              id="setting-button"
              aria-controls={open ? "setting-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDots />
            </IconButton>
          }
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Menu
          id="setting-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "setting-button",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Hướng dẫn</MenuItem>
          <MenuItem onClick={handleClose}>Xuất báo cáo</MenuItem>
          <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
        </Menu>
      </Card>
      <Card variant="outlined" sx={{ mt: 0.5 }}>
        <List>
          <ListItemButton>
            <ListItemIcon>{dashboard.icon}</ListItemIcon>

            <Link href={dashboard.link} underline="none">
              {dashboard.label}
            </Link>
          </ListItemButton>
        </List>
      </Card>
      <Card variant="outlined" sx={{ mt: 0.5 }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Managements
            </ListSubheader>
          }
        >
          {management.map((item, index) => (
            <div className="w-full">
              <ListItemButton onClick={() => handleOpenNested(index)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {openNestedIndex[index] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </ListItemButton>
              <Collapse
                in={openNestedIndex[index]}
                timeout="auto"
                unmountOnExit
              >
                {item.children.map((child) => (
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => navigate(child.link)}
                    >
                      <ListItemIcon>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            </div>
          ))}
        </List>
      </Card>
      <Card variant="outlined" sx={{ mt: 0.5 }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Others
            </ListSubheader>
          }
        >
          {others.map((item, index) => (
            <ListItemButton onClick={() => handleOpenNested(index)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </Box>
  );
};
export default AppSidebar;
