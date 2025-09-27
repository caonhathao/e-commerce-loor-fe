import { Button, Card, CardHeader, Menu, MenuItem } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// formatter cho số lớn
const numberFormatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

// random tới 1 tỉ
const randomRevenue = () => Math.floor(Math.random() * 1_000_000_000);

const dataLast7days = [
  { seller: "A", turnout: randomRevenue() },
  { seller: "B", turnout: randomRevenue() },
  { seller: "C", turnout: randomRevenue() },
  { seller: "D", turnout: randomRevenue() },
  { seller: "E", turnout: randomRevenue() },
  { seller: "F", turnout: randomRevenue() },
  { seller: "G", turnout: randomRevenue() },
  { seller: "H", turnout: randomRevenue() },
  { seller: "I", turnout: randomRevenue() },
  { seller: "K", turnout: randomRevenue() },
];

const dataLast30days = [
  { seller: "A", turnout: randomRevenue() },
  { seller: "B", turnout: randomRevenue() },
  { seller: "C", turnout: randomRevenue() },
  { seller: "D", turnout: randomRevenue() },
  { seller: "E", turnout: randomRevenue() },
  { seller: "F", turnout: randomRevenue() },
  { seller: "G", turnout: randomRevenue() },
  { seller: "H", turnout: randomRevenue() },
  { seller: "I", turnout: randomRevenue() },
  { seller: "K", turnout: randomRevenue() },
];

const dataLast90days = [
  { seller: "A", turnout: randomRevenue() },
  { seller: "B", turnout: randomRevenue() },
  { seller: "C", turnout: randomRevenue() },
  { seller: "D", turnout: randomRevenue() },
  { seller: "E", turnout: randomRevenue() },
  { seller: "F", turnout: randomRevenue() },
  { seller: "G", turnout: randomRevenue() },
  { seller: "H", turnout: randomRevenue() },
  { seller: "I", turnout: randomRevenue() },
  { seller: "K", turnout: randomRevenue() },
];

const SectionTopProductsChart = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [title, setTitle] = useState<string>("Last 7 days");
  const [data, setData] =
    useState<Record<string, string | number>[]>(dataLast7days);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index: number) => {
    if (index === 1) {
      setData(dataLast7days);
      setTitle("Last 7 days");
    } else if (index === 2) {
      setData(dataLast30days);
      setTitle("Last 30 days");
    } else if (index === 3) {
      setData(dataLast90days);
      setTitle("Last 3 months");
    }
    setAnchorEl(null);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Card
        sx={{
          width: "100%",
          borderRadius: 1,
          p: 0.5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
        variant="outlined"
      >
        <CardHeader
          title="Top Sellers"
          subheader="Doanh thu đến hàng tỉ"
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
            <BarChart
              height={300}
              dataset={data}
              layout="horizontal"
              yAxis={[{ scaleType: "band", dataKey: "seller" }]}
              xAxis={[
                { label: "Doanh thu", valueFormatter: numberFormatter.format },
              ]}
              series={[
                {
                  dataKey: "turnout",
                  label: "Doanh thu",
                  color: "hsl(var(--chart-5))",
                },
              ]}
              barLabel={(item) => numberFormatter.format(item.value as number)}
            />
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default SectionTopProductsChart;
