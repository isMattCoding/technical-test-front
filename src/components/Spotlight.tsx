import { useEffect, useState } from "react";
import { Box, TextInput, Title } from '@mantine/core';

export default function Spotlight() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handlePress(e: Record<string, any>) {
      if (e.code === 'Slash') {
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '100vw',
        height: '100vh',
        zIndex: '999',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
      }}
      id="modal-background"
      onClick={(e: Record<string, any>) => {
        if (e.target["id"] === "modal-background") {
          console.log(e)
          setIsOpen(false)}
        }
      }
    >
      <Box style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Box style={{
          width: '50vw',
          minWidth: '300px',
          backgroundColor: 'white',
          height: '160px',
          borderRadius: '1rem',
          padding: '1rem'
        }}>
          <Title>Search: {isOpen}</Title>
          <TextInput
            placeholder="/"
          />
        </Box>
      </Box>
    </Box>
  )
}
