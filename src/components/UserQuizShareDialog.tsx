import {Button, Modal} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

type params = {
    children:any
}


export default function ShowDialog({children}:params){
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                {children}
            </Modal>
            <Button onClick={open} variant="outline">
                Compartir
            </Button>
        </>
    )
}