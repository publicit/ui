import React from 'react';
import { IconShare } from '@tabler/icons-react';

// Mantine :
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type params = {
  children: any;
  onClose: any;
  userQuiz: any;
};

export function ShowGenericDialog({ children, onClose, userQuiz }: params) {
  const [opened, { open, close }] = useDisclosure(false);
  function ModalHeader() {
    return (
      <React.Fragment>
        Compartir encuesta <p>{userQuiz.quiz.name}</p>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Modal
        title={<ModalHeader />}
        opened={opened}
        size="auto"
        className="email-dialog-box"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        onClose={() => {
          onClose();
          close();
        }}
      >
        {children}
      </Modal>
      <Button
        size="md"
        variant="outline"
        className="share-survey-button"
        onClick={() => {
          open();
        }}
      >
        Compartir encuesta por email
        <IconShare className="icon" />
      </Button>
    </React.Fragment>
  );
}
