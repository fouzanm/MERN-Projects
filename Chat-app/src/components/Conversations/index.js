import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

export const Conversations = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      <Header />
      <Box sx={{ flexGrow: 1, width: "100%", height: '100%', overflowY: 'scroll' }}>
        <Message menu={true}/>
      </Box>
      <Footer />
    </Stack>
  );
};
