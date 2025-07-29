'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const schema = z.object({
  firstName: z.string().min(1, 'Vorname ist erforderlich'),
  lastName: z.string().min(1, 'Nachname ist erforderlich'),
  email: z.string().email({ message: 'Ungültige E-Mail-Adresse' }),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  function onSubmit(data) {
    alert('Registrierung erfolgreich (mock)');
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Join Manegers Now!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="block mb-1 font-medium">Vorname</label>
          <input
            {...register('firstName')}
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Nachname</label>
          <input
            {...register('lastName')}
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
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
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Registrieren
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Schon ein Konto?{' '}
        <Link href="/signin" className="text-blue-600 hover:underline">
          Anmelden
        </Link>
      </p>
    </div>
  );
}
