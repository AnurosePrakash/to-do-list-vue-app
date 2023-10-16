<template>
  <header class="sticky top-0 shadow-lg">
    <nav
        class="container flex flex-col justify-center sm:flex-row items-center py-6 text-2xl font-bold font-roboto gap-10 text-gray-500"
    >
      <RouterLink :to="{ name: 'home' }"
                  active-class="text-black underline underline-offset-8 decoration-blue-600 decoration-4">
        To Do List
      </RouterLink>
      <RouterLink :to="{ name: 'backlog' }"
                  active-class="text-black underline underline-offset-8 decoration-blue-600 decoration-4">
        Backlog
      </RouterLink>
    </nav>
  </header>
</template>