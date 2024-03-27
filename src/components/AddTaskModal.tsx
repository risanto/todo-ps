import { Button, Modal, TextInput } from 'flowbite-react';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  addTodo: (text: string) => void;
};

export default function AddTaskModal({
  openModal,
  setOpenModal,
  addTodo,
}: Props) {
  const [text, settext] = useState('');

  const handleAddText = () => {
    addTodo(text);
    setOpenModal(false);
  };

  if (openModal) {
    return (
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Task</Modal.Header>
        <Modal.Body>
          <div className='flex items-center justify-center'>
            <TextInput
              className='flex-grow'
              onChange={(e) => settext(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddText();
                }
              }}
            />

            <Button className='ml-4' onClick={handleAddText}>
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
