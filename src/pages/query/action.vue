<script setup lang="ts">
import { useMutation } from '@pinia/colada'
import { fetchUser } from '~/api'

const { mutateAsync, data } = useMutation({
  key: ['user-action'],
  mutation: fetchUser,
})
</script>

<template>
  <div>
    {{ data }}
    <button @click="mutateAsync(1)">
      action22
    </button>
  </div>
</template>
