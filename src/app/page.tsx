'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>To Do App</title>
      </Head>

      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'></div>
      </section>
    </main>
  );
}
