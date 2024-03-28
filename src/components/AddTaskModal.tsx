import { useQueryClient } from '@tanstack/react-query';
import { Button, Modal, TextInput } from 'flowbite-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from '@/app/page';

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  addTodo: (newTodo: Todo) => void;
};

async function fetchTodoIcon() {
  const res = await fetch('api/icon-img', {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  const { data } = await res.json();
  return data;
}

export default function AddTaskModal({
  openModal,
  setOpenModal,
  addTodo,
}: Props) {
  const queryClient = useQueryClient();
  const [text, settext] = useState('');
  const [error, seterror] = useState('');

  const handleAddTodo = async () => {
    try {
      const iconImg = await queryClient.fetchQuery({
        queryFn: fetchTodoIcon,
        queryKey: ['todoIcon'],
      });

      addTodo({ text, iconImg, checked: false, id: uuidv4() });
      setOpenModal(false);
    } catch (error: any) {
      seterror(error.message);
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Add New Task</Modal.Header>
      <Modal.Body>
        {error.length ? <span className='text-red-500'>{error}</span> : ''}

        <div className='flex items-center justify-center'>
          <TextInput
            className='flex-grow'
            onChange={(e) => settext(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTodo();
              }
            }}
          />

          <Button className='ml-4' onClick={handleAddTodo}>
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
