'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button, Checkbox, Table } from 'flowbite-react';
import Head from 'next/head';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '@/lib/env';

import { cn } from '@/lib/utils';

import AddTaskModal from '@/components/AddTaskModal';
import EditTaskModal from '@/components/EditTaskModal';
import NextImage from '@/components/NextImage';

export type Todo = {
  id: string;
  text: string;
  iconImg: string;
  checked: boolean;
};

const queryClient = new QueryClient();

export default function HomePage() {
  const [openAddTaskModal, setopenAddTaskModal] = useState(false);
  const [openEditTaskModal, setopenEditTaskModal] = useState(false);
  const [todoToEdit, settodoToEdit] = useState<Todo | null>(null);

  const [todoList, settodoList] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    settodoList([...todoList, newTodo]);
  };

  const editTodo = (id: string, editedTodo: Todo) => {
    settodoList(todoList.map((todo) => (todo.id === id ? editedTodo : todo)));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Head>
          <title>To Do App</title>
        </Head>

        <section className='bg-white'>
          <div className='lg:w-[50rem] layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1>To Do List</h1>

            <Button
              className='mt-6 w-full'
              color='purple'
              onClick={() => setopenAddTaskModal(true)}
            >
              Add New Task
            </Button>

            <AddTaskModal
              openModal={openAddTaskModal}
              setOpenModal={setopenAddTaskModal}
              addTodo={addTodo}
            />

            <EditTaskModal
              openModal={openEditTaskModal}
              setOpenModal={setopenEditTaskModal}
              editTodo={editTodo}
              todo={todoToEdit}
            />

            {todoList.length === 0 ? (
              <></>
            ) : (
              <Table className='w-full table-fixed mt-6'>
                <Table.Head className='bg-black'>
                  <Table.HeadCell className='bg-slate-100'>
                    Tasks
                  </Table.HeadCell>
                  <Table.HeadCell className='bg-slate-100 lg:w-32 text-center'>
                    Actions
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body className='divide-y'>
                  {todoList.map((el) => (
                    <Table.Row className='bg-white text-black' key={el.id}>
                      <Table.Cell className='flex items-center'>
                        <Checkbox
                          checked={el.checked}
                          onChange={(e) => {
                            editTodo(el.id, {
                              ...el,
                              checked: e.target.checked,
                            });
                          }}
                        />

                        <NextImage
                          src={el.iconImg}
                          alt={el.text}
                          width={50}
                          height={50}
                          className='ml-4'
                        />

                        <span
                          className={cn(
                            'ml-2',
                            el.checked ? 'line-through' : ''
                          )}
                        >
                          {el.text}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <div className='flex justify-center items-center'>
                          <Button
                            color='transparent'
                            onClick={() => {
                              settodoToEdit(el);
                              setopenEditTaskModal(true);
                            }}
                          >
                            <FaEdit />
                          </Button>

                          <Button color='transparent'>
                            <FaTrash />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </section>
      </main>
    </QueryClientProvider>
  );
}
