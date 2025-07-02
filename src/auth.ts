import { ref } from 'vue'

export const user = ref(null)
export const googleUser = ref<null | {
  name: string
  email: string
  imageUrl?: string
}>(null)
export const signedIn = ref(false)

export function setUser(u: any) {
  googleUser.value = u
  signedIn.value = !!u
}

export function clearUser() {
  googleUser.value = null
  signedIn.value = false
}

export async function fetchUser() {
  try {
    const res = await fetch('/api/me', { credentials: 'include' })
    if (!res.ok) throw new Error()
    user.value = await res.json()
    signedIn.value = true
  } catch {
    user.value = null
    signedIn.value = false
  }
}

export async function signIn(email: string, password: string) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Giriş başarısız")
  }
  user.value = await res.json()
  console.log(res.json())
  signedIn.value = true
}

export async function register(
  name: string,
  email: string,
  password: string,
  country?: string,
  city?: string,
  photo_url?: string
) {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password, country, city, photo_url })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Kayıt başarısız")
  }
  user.value = await res.json()
  signedIn.value = true
}

export async function signOut() {
  await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include'
  })
  user.value = null
  signedIn.value = false
}
