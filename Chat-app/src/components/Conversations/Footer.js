import React from "react";
import { useTheme } from "@emotion/react";
import { Box, IconButton, InputAdornment, Stack } from "@mui/material";
import { LinkSimple, PaperPlaneTilt, Smiley } from "phosphor-react";
import { StyledInput } from "../StyledInput";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0.25)",
      }}
      p={2}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <StyledInput
          fullWidth
          placeholder="Write a message..."
          variant="filled"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <Smiley />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            width: 48,
            height: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ width: "100%", height: "100%" }}
          >
            <IconButton>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
