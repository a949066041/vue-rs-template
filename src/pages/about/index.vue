<template>
  <div>
      <div>about page</div>
      <div class=" space-x-2">
        <RouterLink to="/about/1" class=" border-b border-dashed border-blue-300">link to about detail</RouterLink>
        <RouterLink to="/about/name" class=" border-b border-dashed border-blue-300">link to about name</RouterLink>
        <RouterLink :to="{ name: '/about/name/[name]', params: { name: 'test' } }" class=" border-b border-dashed border-blue-300">link to about name detail</RouterLink>
        <RouterLink :to="{ name: '/about/[value]/', params: { value: 'value' } }" class=" border-b border-dashed border-blue-300">link to about $value</RouterLink>
        <RouterLink :to="{ name: '/about/[value]/create', params: { value: 'value2' } }" class=" border-b border-dashed border-blue-300">link to about $value create</RouterLink>
      </div>
    </div>
</template>