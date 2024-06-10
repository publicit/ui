import { ClipboardCopy } from 'tabler-icons-react';

// Mantine :
import { ActionIcon, Group, TextInput } from '@mantine/core';

// Helpers :
import { popupInfo } from './Notifier';

type params = {
  sharedUrl: string;
  onClick?: any;
  text: string;
};

async function copyTokenUrlToClipboard(sharedUrl: string) {
  try {
    if (!navigator?.clipboard) return;
    await navigator.clipboard.writeText(sharedUrl);
  } catch (err) {}
}

export function ShareDialogBody({ sharedUrl, onClick, text }: params) {
  return (
    <>
      <Group>
        <TextInput
          label="Link"
          value={sharedUrl}
          disabled={true}
          placeholder=""
          className="link-input"
        />
        <div className="clipboard-icon">
          <ActionIcon
            variant="filled"
            className="clipboard"
            onClick={async () => {
              await copyTokenUrlToClipboard(sharedUrl);
              popupInfo({
                title: 'Copiado',
                confirmButtonText: true,
                timer: 3000,
                text,
              });
            }}
          >
            <ClipboardCopy className="icon" onClick={onClick} />
          </ActionIcon>
        </div>
      </Group>
    </>
  );
}
