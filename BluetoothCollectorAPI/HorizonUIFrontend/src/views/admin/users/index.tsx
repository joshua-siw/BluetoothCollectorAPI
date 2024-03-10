/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useAppSelector } from "../../../store/selectors";
import { useDispatch } from "react-redux";
import React from "react";
import { UserActionType } from "store/enums";
import UsersTable from "./components/usersTable";

export default function Settings() {
  const dispatch = useDispatch();
  const { loading, error, users } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    dispatch({
      type: UserActionType.GET_ALL_REQUEST,
      payload: {},
    });
    return () => {};
  }, []);

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <UsersTable tableData={users} />
      </SimpleGrid>
    </Box>
  );
}
