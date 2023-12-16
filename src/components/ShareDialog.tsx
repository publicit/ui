import {ActionIcon, Group, TextInput} from "@mantine/core";
import {popupInfo} from "./Notifier";
import {ClipboardCopy} from "tabler-icons-react";

type params = {
    sharedUrl: string
    shareQuiz: any
}

async function copyTokenUrlToClipboard(sharedUrl: string) {
    try {
        if (!navigator?.clipboard) return
        await navigator.clipboard.writeText(sharedUrl)
    } catch (err) {
    }
}


export function ShareDialogBody({sharedUrl, shareQuiz}: params) {
    return (
        <>
            <Group>
                <TextInput label="Link"
                           style={{width: "400px"}}
                           placeholder=""
                           value={sharedUrl}
                           disabled={true}/>
                <ActionIcon variant="filled" onClick={async () => {
                    await copyTokenUrlToClipboard(sharedUrl)
                    popupInfo({
                        title: "Copiado",
                        text: "Se ha copiado la direccion de la invitacion",
                        confirmButtonText: true,
                        timer: 3000,
                    })
                }}>
                    <ClipboardCopy style={{width: '70%', height: '70%'}} onClick={() => shareQuiz()}/>
                </ActionIcon>
            </Group>
        </>
    )
}
