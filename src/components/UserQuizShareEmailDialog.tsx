import React from "react";
import { IconShare } from '@tabler/icons-react';

// Mantine :
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


type params = {
    children: any
    onClose: any
    modalTitle: string
    buttonTitle: string
}

export function ShowGenericDialog({ buttonTitle, children, onClose, modalTitle }: params) {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <React.Fragment>
            <Modal
                title={modalTitle} size="auto"
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
            <Button size="md" variant="outline"
                className="share-survey-button"
                onClick={() => { open() }}
            >
                {buttonTitle} <IconShare className="icon" />
            </Button>
        </React.Fragment>
    )
}
