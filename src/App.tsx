import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ValidatorList from "./components/Validators";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text fontSize="2xl">Elastos DPoS 2.0 Validators (Testnet)</Text>
            <ValidatorList />
            {/* <Logo h="40vmin" pointerEvents="none" /> */}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
