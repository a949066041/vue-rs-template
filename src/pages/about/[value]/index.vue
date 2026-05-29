<template>
  <div>Hello "/about/[value]/"! {{ ($route.params as any).value }}</div>
</template>
