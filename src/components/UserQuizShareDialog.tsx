import React from "react";

// Mantine :
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


type params = {
    children: any
    onClose: any
    onOpen: any
}
export function ShowDialog({ children, onClose, onOpen }: params) {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <React.Fragment>
            <Modal
                title="Compartir Encuesta" size="auto"
                opened={opened}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                onClose={
                    () => {
                        onClose()
                        close()
                    }}
            >
                {children}
            </Modal>
            <Button size="md"
                variant="outline" className="share-survey-button"
                onClick={
                    () => {
                        onOpen()
                        open()
                    }}
            >
                Compartir Encuesta
            </Button>
        </React.Fragment>
    )
}
