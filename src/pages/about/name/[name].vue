<template>
  <div> Hello "/about/name/[name]"! {{ ($route.params as any).name }}</div>
</template>
