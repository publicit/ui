import {Button, Modal} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

type params = {
    children: any
    onClose: any
    onOpen: any
}


export default function ShowDialog({children, onClose, onOpen}: params) {
    const [opened, {open, close}] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={() => {
                onClose()
                close()
            }} title="Compartir Encuesta">
                {children}
            </Modal>
            <Button onClick={() => {
                onOpen()
                open()
            }} variant="outline">
                Compartir Encuesta
            </Button>
        </>
    )
}