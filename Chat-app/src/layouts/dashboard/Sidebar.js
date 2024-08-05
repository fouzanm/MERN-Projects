import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import { useNavigate } from "react-router-dom";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";

    default:
      break;
  }
};

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      // TODO update token and set authenticate to false
      return "/auth/login";

    default:
      break;
  }
};

export const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { onToggleMode } = useSettings();
  const [selected, setSelected] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        height: " 100vh",
        width: "100px",
      }}
    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={Logo} alt="" />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction={"column"}
            alignItems={"center"}
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  key={el.index}
                >
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getPath(el.index));
                  }}
                >
                  {el.icon}
                </IconButton>
              )
            )}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                sx={{
                  width: "max-content",
                  color:
                    theme.palette.mode === "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
                onClick={() => {
                  setSelected(3);
                  navigate(getPath(3));
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch defaultChecked onClick={() => onToggleMode()} />
          <Avatar
            id="profile-positioned-button"
            aria-controls={openMenu ? "profile-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            alt={faker.name.fullName()}
            src={faker.image.avatar()}
            onClick={handleClick}
          />
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            TransitionComponent={Fade}
            id="profile-positioned-menu"
            aria-labelledby="profile-positioned-button"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box p={1}>
              <Stack spacing={1}>
                {Profile_Menu.map((el, index) => (
                  <MenuItem onClick={handleClose}>
                    <Stack
                      onClick={() => navigate(getMenuPath(index))}
                      sx={{ width: 100 }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};
