import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setMensaje('¡Usuario registrado con éxito!')
    } catch (error: any) {
      setMensaje(`Error: ${error.message}`)
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Usuario</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Registrarse
        </button>
        {mensaje && <p className="text-center mt-4 text-sm text-green-700">{mensaje}</p>}
      </form>
    </div>
  )
}

export default Register
