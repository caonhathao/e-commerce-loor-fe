import { Button, Card, CardHeader, Menu, MenuItem } from "@mui/material";
import { areaElementClasses, LineChart } from "@mui/x-charts/LineChart";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

let today;
let past: any;
let dates: string[];

//for last 7 days
today = new Date();
past = new Date();
past.setDate(today.getDate() - 6); // tính cả hôm nay thành 90 ngày

// Tạo mảng ngày
dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(past);
  d.setDate(past.getDate() + i);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

const data7days = {
  x: dates,
  data: [20, 40, 35, 50, 49, 60, 70],
};

//for last 30 days
today = new Date();
past = new Date();
past.setDate(today.getDate() - 29); // tính cả hôm nay thành 90 ngày

// Tạo mảng ngày
dates = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(past);
  d.setDate(past.getDate() + i);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

const data30days = {
  x: dates,
  data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1),
};

//for last 90 days
today = new Date();
past = new Date();
past.setDate(today.getDate() - 89); // tính cả hôm nay thành 90 ngày

// Tạo mảng ngày
dates = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(past);
  d.setDate(past.getDate() + i);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

const dataLast90Days = {
  x: dates,
  data: Array.from({ length: 90 }, () => Math.floor(Math.random() * 1000) + 1),
};

const SectionRevenueChart = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [xAxisData, setXAxisData] = useState<string[]>(data7days.x);
  const [seriesData, setSeriesData] = useState<number[]>(data7days.data);
  const [title, setTitle] = useState<string>("Last 7 days");

  const handleClose = (index: number) => {
    if (index === 1) {
      setXAxisData(data7days.x);
      setSeriesData(data7days.data);
      setTitle("Last 7 days");
    } else if (index === 2) {
      setXAxisData(data30days.x);
      setSeriesData(data30days.data);
      setTitle("Last 30 days");
    } else if (index === 3) {
      setXAxisData(dataLast90Days.x);
      setSeriesData(dataLast90Days.data);
      setTitle("Last 3 months");
    }
    setAnchorEl(null);
  };


  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Card
        sx={{
          width: "100%",
          borderRadius: 5,
          p: 0.5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
        variant="outlined"
      >
        <CardHeader
          title="Doanh thu theo thời gian"
          subheader="Tổng doanh thu: 230M"
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
            <LineChart
              xAxis={[
                {
                  data: xAxisData,
                  scaleType: "point",
                  disableTicks: true,
                  tickInterval: (value, index) => index % 7 === 0,
                },
              ]}
              yAxis={[{ position: "none" }]}
              series={[
                {
                  data: seriesData,
                  color: "hsl(var(--chart-1))",
                  showMark: true,
                  area: true,
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
              grid={{ horizontal: true }}
            >
              <defs>
                <linearGradient
                  id="smooth-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.4}
                  />{" "}
                  {/* trên cùng */}
                  <stop offset="100%" stopColor="#fff" stopOpacity={0.2} />{" "}
                  {/* dưới cùng */}
                </linearGradient>
              </defs>
            </LineChart>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default SectionRevenueChart;
