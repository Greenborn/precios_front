<template>
  <div class="modal-chat" v-if="isVisible">
    <div class="modal-chat-content">
      <h2>Chat</h2>
      <div class="chat-messages">
        <!-- Mensajes de chat -->
      </div>
      <input type="text" v-model="message" @keydown.enter="sendMessage">
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')

function open() {
  isVisible.value = true
}

function close() {
  isVisible.value = false
}

function sendMessage() {
  // Enviar mensaje de chat
}
</script>

<style scoped>
/* ... */
</style>