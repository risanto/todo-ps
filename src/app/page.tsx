'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button, Checkbox, ListGroup } from 'flowbite-react';
import Head from 'next/head';
import { useState } from 'react';
import '@/lib/env';

import { cn } from '@/lib/utils';

import AddTaskModal from '@/components/AddTaskModal';
import NextImage from '@/components/NextImage';

export type Todo = {
  text: string;
  iconImg: string;
  checked: boolean;
};

const queryClient = new QueryClient();

export default function HomePage() {
  const [openAddTaskModal, setopenAddTaskModal] = useState(false);
  const [todoList, settodoList] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    settodoList([...todoList, newTodo]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Head>
          <title>To Do App</title>
        </Head>

        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1>To Do List</h1>

            <div className='mt-6'>
              <Button color='purple' onClick={() => setopenAddTaskModal(true)}>
                Add New Task
              </Button>
            </div>

            <div className='mt-6'>
              <AddTaskModal
                openModal={openAddTaskModal}
                setOpenModal={setopenAddTaskModal}
                addTodo={addTodo}
              />
            </div>

            <ListGroup>
              {todoList.map((el, idx) => (
                <ListGroup.Item key={idx}>
                  <Checkbox
                    checked={el.checked}
                    onChange={(e) => {
                      settodoList(
                        todoList.map((todo, todoIdx) =>
                          todoIdx === idx
                            ? { ...todo, checked: e.target.checked }
                            : todo
                        )
                      );
                    }}
                  />

                  <NextImage
                    src={el.iconImg}
                    alt={el.text}
                    width={50}
                    height={50}
                    className='ml-2'
                  />

                  <span
                    className={cn('ml-2', el.checked ? 'line-through' : '')}
                  >
                    {el.text}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </section>
      </main>
    </QueryClientProvider>
  );
}
