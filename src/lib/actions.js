'use server'
import { revalidatePath } from 'next/cache'

export async function getAllChallenges() {
  const res = await fetch('http://localhost:8080/challenges')
  if (!res.ok) throw new Error('Fetch failed')
  return res.json()
}

export async function deleteChallengeById(id) {
  const res = await fetch(`http://localhost:8080/challenges/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Delete failed')
  revalidatePath('/dashboard')
  return true
}

export async function createChallenge(data) {
  const res = await fetch('http://localhost:8080/challenges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Create failed')
  revalidatePath('/dashboard')
  return true
}