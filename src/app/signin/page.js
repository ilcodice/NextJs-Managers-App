'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import axios from 'axios';

const schema = z.object({
  email: z.string().email({ message: 'Ungültige E-Mail-Adresse' }),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login/manager', // Backend-Login-URL anpassen falls nötig
        {
          email: data.email,
          password: data.password,
        }
      );

      alert(response.data?.message || 'Anmeldung erfolgreich!');
      // Hier kannst du z.B. Token speichern oder Weiterleitung machen
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || `Fehler: ${error.response.status}`);
      } else if (error.request) {
        alert('Keine Antwort vom Server erhalten.');
      } else {
        alert('Ein unbekannter Fehler ist aufgetreten.');
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Anmelden als Manager</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="block mb-1 font-medium">E-Mail</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Passwort</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Anmelden
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Noch kein Konto?{' '}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Registrieren
        </Link>
      </p>
    </div>
  );
}
