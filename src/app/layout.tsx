import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider, Box } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cats and Dogs Breeds",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <ChakraProvider>
          <Box position="relative" minHeight="100vh" overflow="hidden">
            {/* Background Video */}
            <Box
              as="video"
              autoPlay
              loop
              muted
              playsInline
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              objectFit="cover"
              zIndex="-1"
              filter="brightness(0.5)"
            >
              <source src="/wallpaper.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </Box>

            {/* Main content */}
            <Box position="relative" zIndex="1">
              {children}
            </Box>
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
