import React, { useState } from 'react';
import { Code2, Brain, Trophy, Users, ArrowLeft, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Componente de Login/Registro
function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Un error ocurrió durante la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Code2 className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">CodePráctica</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Inicia sesión para acceder' : 'Regístrate para comenzar'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Correo electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-orange-600 hover:text-orange-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLogin ? (
                  <LogIn className="h-5 w-5 text-orange-300 group-hover:text-orange-400" />
                ) : (
                  <UserPlus className="h-5 w-5 text-orange-300 group-hover:text-orange-400" />
                )}
              </span>
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Datos de ejemplo
const problemas = [
  {
    id: 1,
    titulo: 'Suma de dos números',
    dificultad: 'Fácil',
    aceptacion: '75%',
    categoria: 'Arreglos',
    descripcion: 'Dado un array de números enteros y un valor objetivo, devuelve los índices de los dos números que suman el objetivo.',
    ejemploEntrada: '[2, 7, 11, 15], objetivo = 9',
    ejemploSalida: '[0, 1]',
    explicacion: 'Porque nums[0] + nums[1] = 2 + 7 = 9',
    codigoInicial: `function sumaDosNumeros(nums, objetivo) {
    // Tu código aquí
    
}`
  },
  {
    id: 2,
    titulo: 'Palíndromo',
    dificultad: 'Fácil',
    aceptacion: '65%',
    categoria: 'Cadenas',
    descripcion: 'Determina si una cadena es un palíndromo. Una cadena es un palíndromo cuando se lee igual de izquierda a derecha que de derecha a izquierda.',
    ejemploEntrada: '"ana"',
    ejemploSalida: 'true',
    explicacion: 'La palabra "ana" se lee igual en ambos sentidos',
    codigoInicial: `function esPalindromo(texto) {
    // Tu código aquí
    
}`
  },
  {
    id: 3,
    titulo: 'Búsqueda Binaria',
    dificultad: 'Medio',
    aceptacion: '45%',
    categoria: 'Algoritmos',
    descripcion: 'Implementa la búsqueda binaria. Dado un array ordenado de números enteros y un valor objetivo, devuelve el índice si se encuentra o -1 si no está presente.',
    ejemploEntrada: '[1, 2, 3, 4, 5, 6, 7, 8, 9], objetivo = 5',
    ejemploSalida: '4',
    explicacion: 'El número 5 está en el índice 4',
    codigoInicial: `function busquedaBinaria(nums, objetivo) {
    // Tu código aquí
    
}`
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState('problemas');
  const [problemaSeleccionado, setProblemaSeleccionado] = useState<number | null>(null);
  const [codigo, setCodigo] = useState('');

  if (!isLoggedIn) {
    return <AuthPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const problema = problemaSeleccionado !== null ? problemas[problemaSeleccionado] : null;

  const ejecutarCodigo = () => {
    try {
      // Crear una función segura para evaluar el código
      const funcionSegura = new Function('return ' + codigo)();
      
      // Probar el código con el ejemplo
      let resultado;
      if (problema?.id === 1) {
        resultado = funcionSegura([2, 7, 11, 15], 9);
        if (JSON.stringify(resultado) === '[0,1]') {
          alert('¡Correcto! Tu solución funciona para el caso de prueba.');
        } else {
          alert('Incorrecto. Intenta de nuevo.');
        }
      } else if (problema?.id === 2) {
        resultado = funcionSegura('ana');
        if (resultado === true) {
          alert('¡Correcto! Tu solución funciona para el caso de prueba.');
        } else {
          alert('Incorrecto. Intenta de nuevo.');
        }
      } else if (problema?.id === 3) {
        resultado = funcionSegura([1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
        if (resultado === 4) {
          alert('¡Correcto! Tu solución funciona para el caso de prueba.');
        } else {
          alert('Incorrecto. Intenta de nuevo.');
        }
      }
    } catch (error) {
      alert('Error al ejecutar el código: ' + error);
    }
  };

  if (problemaSeleccionado !== null && problema) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-16">
              <button 
                className="flex items-center text-gray-500 hover:text-orange-500"
                onClick={() => setProblemaSeleccionado(null)}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver a la lista
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Descripción del problema */}
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{problema.titulo}</h1>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mb-4 ${
                problema.dificultad === 'Fácil' 
                  ? 'bg-green-100 text-green-800'
                  : problema.dificultad === 'Medio'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {problema.dificultad}
              </span>
              <div className="prose">
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-gray-600 mb-4">{problema.descripcion}</p>
                
                <h3 className="text-lg font-semibold mb-2">Ejemplo</h3>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p><strong>Entrada:</strong> {problema.ejemploEntrada}</p>
                  <p><strong>Salida:</strong> {problema.ejemploSalida}</p>
                  <p><strong>Explicación:</strong> {problema.explicacion}</p>
                </div>
              </div>
            </div>

            {/* Editor de código */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800">Editor de Código</h2>
              </div>
              <div className="h-[500px] p-4">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  defaultValue={problema.codigoInicial}
                  theme="vs-dark"
                  onChange={(value) => setCodigo(value || '')}
                />
              </div>
              <div className="px-6 py-4 border-t">
                <button
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  onClick={ejecutarCodigo}
                >
                  Ejecutar Código
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold">CodePráctica</span>
            </div>
            <div className="flex space-x-8">
              <button 
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  pestanaActiva === 'problemas' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
                }`}
                onClick={() => setPestanaActiva('problemas')}
              >
                <Brain className="h-5 w-5 mr-1" />
                Problemas
              </button>
              <button 
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  pestanaActiva === 'concursos' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
                }`}
                onClick={() => setPestanaActiva('concursos')}
              >
                <Trophy className="h-5 w-5 mr-1" />
                Concursos
              </button>
              <button 
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  pestanaActiva === 'comunidad' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
                }`}
                onClick={() => setPestanaActiva('comunidad')}
              >
                <Users className="h-5 w-5 mr-1" />
                Comunidad
              </button>
              <button 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-orange-500"
                onClick={() => setIsLoggedIn(false)}
              >
                <LogIn className="h-5 w-5 mr-1" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Encabezado de la tabla */}
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Lista de Problemas</h2>
          </div>

          {/* Tabla de problemas */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dificultad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aceptación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {problemas.map((problema, index) => (
                  <tr 
                    key={problema.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setProblemaSeleccionado(index)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-orange-600">{problema.titulo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        problema.dificultad === 'Fácil' 
                          ? 'bg-green-100 text-green-800'
                          : problema.dificultad === 'Medio'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {problema.dificultad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {problema.aceptacion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {problema.categoria}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;