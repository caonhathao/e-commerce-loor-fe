import AppSidebar from "@/components/ui-custom/admin/dashboard/app-sidebar";
import { Outlet } from "react-router-dom";
import { IoMdSunny } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { MdHdrAuto } from "react-icons/md";
import {
  IconButton,
  Menu,
  MenuItem,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const AdminLayout = () => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  // system | light | dark
  const [mode, setMode] = React.useState<"light" | "dark" | "system">(
    () => (localStorage.getItem("theme") as any) || "system"
  );

  const effectiveMode =
    mode === "system" ? (prefersDark ? "dark" : "light") : mode;

  // Đồng bộ Tailwind (dark class)
  React.useEffect(() => {
    const root = document.documentElement;
    if (effectiveMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [effectiveMode]);

  // Lưu lại localStorage
  React.useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  // Theme MUI
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: effectiveMode,
        },
      }),
    [effectiveMode]
  );

  // Menu toggle theme
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-full h-screen flex flex-row justify-around items-center relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <AppSidebar />
        <Outlet />

        {/* Toggle theme button */}
        <div className="absolute h-fit w-fit bottom-10 right-10">
          <IconButton
            id="toggle-mode-button"
            aria-controls={open ? "toggle-mode-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {effectiveMode === "dark" ? <IoMdSunny /> : <IoSunnyOutline />}
          </IconButton>
          <Menu
            id="toggle-mode-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                setMode("dark");
                handleClose();
              }}
              sx={{ gap: 2 }}
            >
              <IoMdSunny /> Dark mode
            </MenuItem>
            <MenuItem
              onClick={() => {
                setMode("light");
                handleClose();
              }}
              sx={{ gap: 2 }}
            >
              <IoSunnyOutline /> Light mode
            </MenuItem>
            <MenuItem
              onClick={() => {
                setMode("system");
                handleClose();
              }}
              sx={{ gap: 2 }}
            >
              <MdHdrAuto /> System
            </MenuItem>
          </Menu>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
