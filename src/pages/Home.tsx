import React from "react";
import { Box } from "@chakra-ui/react";
import {UserStore} from "../models/sso_user";

export default function () {
    const userStore = new UserStore()
    const user = userStore.load()
  return (
    <Box>
      <p>Home Page</p>
        {userStore.isLoggedIn() && `Bienvenido: ${user?.firstName} ${user?.lastName}`}
    </Box>
  );
}
