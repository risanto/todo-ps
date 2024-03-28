import { Button, Modal, TextInput } from 'flowbite-react';
import { Dispatch, SetStateAction, useState } from 'react';

import { Todo } from '@/components/Todo/TodoComponent';

type Props = {
  todo: Todo | null;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editTodo: (id: string, editedTodo: Todo) => void;
};

export default function EditTaskModal({
  todo,
  openModal,
  setOpenModal,
  editTodo,
}: Props) {
  const [newText, setnewText] = useState('');

  if (!todo) return <></>;

  const handleEditTodo = async () => {
    editTodo(todo.id, { ...todo, text: newText });
    setOpenModal(false);
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Body>
        <div className='flex items-center justify-center'>
          <TextInput
            className='flex-grow'
            defaultValue={todo.text}
            onChange={(e) => setnewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditTodo();
              }
            }}
          />

          <Button className='ml-4' onClick={handleEditTodo}>
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
