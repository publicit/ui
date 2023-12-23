import {ActionIcon, Group, TextInput} from "@mantine/core";
import {popupInfo} from "./Notifier";
import {ClipboardCopy} from "tabler-icons-react";

type params = {
    sharedUrl: string
    onClick?: any
    text:string
}

async function copyTokenUrlToClipboard(sharedUrl: string) {
    try {
        if (!navigator?.clipboard) return
        await navigator.clipboard.writeText(sharedUrl)
    } catch (err) {
    }
}


export function ShareDialogBody({sharedUrl, onClick,text}: params) {
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
                        confirmButtonText: true,
                        timer: 3000,
                        text,
                    })
                }}>
                    <ClipboardCopy style={{width: '70%', height: '70%'}} onClick={onClick}/>
                </ActionIcon>
            </Group>
        </>
    )
}
