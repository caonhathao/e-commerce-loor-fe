import { Button, Card, CardHeader, Menu, MenuItem } from "@mui/material";
import { areaElementClasses, LineChart, PieChart } from "@mui/x-charts";
import { AnimatePresence, color, motion } from "framer-motion";
import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const data7days = [
  {
    id: 0,
    value: Math.floor(Math.random() * 100) + 1,
    label: "Đang xử lý",
    color: "url(#gradient0)",
  },
  {
    id: 1,
    value: Math.floor(Math.random() * 100) + 1,
    label: "Đang giao",
    color: "url(#gradient1)",
  },
  {
    id: 2,
    value: Math.floor(Math.random() * 100) + 1,
    label: "Hoàn tất",
    color: "url(#gradient2)",
  },
  {
    id: 3,
    value: Math.floor(Math.random() * 100) + 1,
    label: "Đã hủy",
    color: "url(#gradient3)",
  },
  {
    id: 4,
    value: Math.floor(Math.random() * 100) + 1,
    label: "Hoàn trả",
    color: "url(#gradient4)",
  },
];

const data30days = [
  {
    id: 0,
    label: "Đang xử lý",
    value: Math.floor(Math.random() * 100) + 1,
    color: "url(#gradient0)",
  },
  {
    id: 1,
    label: "Đang giao",
    value: Math.floor(Math.random() * 100) + 1,
    color: "url(#gradient1)",
  },
  {
    id: 2,
    label: "Hoàn tất",
    value: Math.floor(Math.random() * 100) + 1,
    color: "url(#gradient2)",
  },
  {
    id: 3,
    label: "Đã hủy",
    value: Math.floor(Math.random() * 100) + 1,
    color: "url(#gradient3)",
  },
  {
    id: 4,
    label: "Hoàn trả",
    value: Math.floor(Math.random() * 100) + 1,
    color: "url(#gradient4)",
  },
];

const dataLast90days = [
  {
    id: 0,
    label: "Đang xử lý",
    value: Math.floor(Math.random() * 1000) + 1,
    color: "url(#gradient0)",
  },
  {
    id: 1,
    label: "Đang giao",
    value: Math.floor(Math.random() * 1000) + 1,
    color: "url(#gradient1)",
  },
  {
    id: 2,
    label: "Hoàn tất",
    value: Math.floor(Math.random() * 1000) + 1,
    color: "url(#gradient2)",
  },
  {
    id: 3,
    label: "Đã hủy",
    value: Math.floor(Math.random() * 1000) + 1,
    color: "url(#gradient3)",
  },
  {
    id: 4,
    label: "Hoàn trả",
    value: Math.floor(Math.random() * 1000) + 1,
    color: "url(#gradient4)",
  },
];

interface typeDataChart {
  id: number;
  label: string;
  value: number;
  color: string;
}

const SectionOrderStatusChart = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [seriesData, setSeriesData] = useState<typeDataChart[]>(data7days);
  const [title, setTitle] = useState<string>("Last 7 days");

  const handleClose = (index: number) => {
    if (index === 1) {
      setSeriesData(data7days);
      setTitle("Last 7 days");
    } else if (index === 2) {
      setSeriesData(data30days);
      setTitle("Last 30 days");
    } else if (index === 3) {
      setSeriesData(dataLast90days);
      setTitle("Last 3 months");
    }
    setAnchorEl(null);
  };
  return (
    <div className="w-fit">
      <Card
        sx={{
          width: 350,
          borderRadius: 5,
          p: 0.5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
        variant="outlined"
      >
        <CardHeader
          title="Phân bổ trạng thái đơn hàng"
          subheader="Tổng đơn hàng hiện tại: 230"
          action={
            <div>
              <Button
                id="toggle-time-button"
                aria-controls={open ? "toggle-time-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ gap: 2 }}
              >
                {title}
                {anchorEl ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Button>
              <Menu
                id="toggle-time-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "toggle-time-button",
                  },
                }}
              >
                <MenuItem onClick={() => handleClose(1)}>Last 7 days</MenuItem>
                <MenuItem onClick={() => handleClose(2)}>Last 30 days</MenuItem>
                <MenuItem onClick={() => handleClose(3)}>
                  Last 3 months
                </MenuItem>
              </Menu>
            </div>
          }
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={title} // key khác nhau → AnimatePresence biết remount
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <PieChart
              series={[
                {
                  innerRadius: 30,
                  outerRadius: 100,
                  data: seriesData,
                  color: "hsl(var(--chart-1))",
                  arcLabel: "value",
                },
              ]}
              height={200}
              margin={{ right: 24, bottom: 0 }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: "url(#smooth-gradient)", // gọi id gradient
                  filter: "none",
                },
              }}
            >
              <defs>
                <linearGradient
                  id="gradient0"
                  x1="50%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.6}
                  />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>

                <linearGradient
                  id="gradient1"
                  x1="50%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.6}
                  />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>

                <linearGradient
                  id="gradient2"
                  x1="50%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0.6}
                  />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
                <linearGradient
                  id="gradient3"
                  x1="50%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-4))"
                    stopOpacity={0.6}
                  />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>

                <linearGradient
                  id="gradient4"
                  x1="50%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-5))"
                    stopOpacity={0.6}
                  />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
              </defs>
            </PieChart>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};
export default SectionOrderStatusChart;
