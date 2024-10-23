/* eslint-disable import/no-unresolved */
import React from "react";
import NavbarLayout from "@theme/Navbar/Layout";
import NavbarContent from "@theme/Navbar/Content";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Navbar() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
    </QueryClientProvider>
  );
}
