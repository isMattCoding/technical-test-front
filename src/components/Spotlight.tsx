import { useEffect, useState } from "react";
import { Box, Title } from '@mantine/core';
import "./spotlight.css"
import Search from "./Search";

export default function Spotlight() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handlePress(e: Record<string, any>) {
      if (e.code === 'Slash') {
        e.preventDefault();
        setIsOpen(prevIsOpen => !prevIsOpen)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    }
    document.addEventListener("keydown", handlePress)

    return () => document.removeEventListener("keydown", handlePress)
  }, [])

  return (
    <Box
      style={{
        display: isOpen ? 'block' : 'none',
      }}
      id="modal-background"
      onClick={(e: Record<string, any>) => {
        if (e.target["id"] === "modal-background") {
          console.log(e)
          setIsOpen(false)}
        }
      }
    >
      <Box className="center">
        <Box className="spotlight-modal">
          <Title>Search: {isOpen}</Title>
          <Search />
        </Box>
      </Box>
    </Box>
  )
}
