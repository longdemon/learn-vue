<script setup>
import { useAuthState } from "../store";
import router from "../router";

const {getUsername, handleLogout} = useAuthState()
const submitLogout = () => {
  handleLogout()
  router.push('login')
} 

</script>

<template>
  <main>
    Wellcome {{getUsername()}}
    <button @click="submitLogout">
      Logout
    </button>
  </main>
</template>
