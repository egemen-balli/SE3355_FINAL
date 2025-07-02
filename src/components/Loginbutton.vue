<template>
  <div>
    <div id="g_id_onload"
         :data-client_id="clientId"
         data-callback="handleCredentialResponse"
         data-auto_prompt="false"></div>

    <div class="g_id_signin"
         data-type="standard"
         data-shape="rectangular"
         data-theme="outline"
         data-text="signin_with"
         data-size="large"
         data-logo_alignment="left">
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { user, signedIn } from '../auth'
const clientId = '1063463680190-oi81jpdoivdq48t1orog7v2m4vd1hcsb.apps.googleusercontent.com'

onMounted(() => {

  if (!window.google) {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }

  window.handleCredentialResponse = async (response) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credential: response.credential })
    })

    if (res.ok) {
      const u = await res.json()
      user.value = u
      signedIn.value = true
    } else {
      alert("Google login failed")
    }
  }
})
</script>
