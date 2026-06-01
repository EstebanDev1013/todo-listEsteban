# Todo Mobile — Gestor de Tareas

Aplicación móvil multiplataforma para gestionar listas de tareas. Permite crear categorías de tareas (task lists), agregar ítems con prioridad y fecha límite, y marcarlos como completados. Incluye autenticación con Firebase y sincronización con un backend propio.

---

## Tecnologías utilizadas

| Capa                 | Tecnología                                                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework móvil      | [Expo](https://expo.dev) (React Native)                                                                                                        |
| Routing              | [Expo Router](https://expo.github.io/router/) (file-based)                                                                                     |
| Autenticación        | [Firebase Authentication](https://firebase.google.com/products/auth)                                                                           |
| HTTP client          | [Axios](https://axios-http.com/)                                                                                                               |
| UI components        | [Gluestack UI](https://gluestack.io/) + [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)                                               |
| Animaciones          | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) + [Legendapp Motion](https://legendapp.com/open-source/motion/) |
| Almacenamiento local | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)                                                                    |
| Componentes docs     | [Storybook](https://storybook.js.org/)                                                                                                         |
| Lenguaje             | TypeScript                                                                                                                                     |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- [Yarn](https://yarnpkg.com/) >= 1.22
- [Expo Go](https://expo.dev/go) instalado en tu dispositivo físico **o** un simulador iOS/Android configurado

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd todo-mobile

# 2. Instalar dependencias
yarn install
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id

# Backend API
EXPO_PUBLIC_API_URL=https://your-backend-url
```

> Para desarrollo local, puedes apuntar `EXPO_PUBLIC_API_URL` a tu máquina: `http://<tu-ip-local>:8080`

---

## Cómo ejecutar el proyecto

```bash
yarn run start
```

En la terminal verás un código QR y las siguientes opciones:

| Tecla       | Acción                                |
| ----------- | ------------------------------------- |
| `a`         | Abrir en emulador Android             |
| `i`         | Abrir en simulador iOS                |
| `w`         | Abrir en el navegador (web)           |
| escanear QR | Abrir en Expo Go (dispositivo físico) |

## Usuarios de prueba

No hay usuarios predefinidos. Para probar la aplicación regístrate desde la pantalla de registro con cualquier email y contraseña válidos.

**Requisitos de contraseña:**

- Mínimo 6 caracteres
- Al menos una letra mayúscula
- Al menos un número
- Al menos un carácter especial

---

## Estructura del proyecto

```
todo-mobile/
├── app/                  # Pantallas (Expo Router file-based routing)
│   ├── (tabs)/           # Pantallas con barra de navegación inferior
│   │   └── index.tsx     # Home — lista de task lists
│   ├── tasks/
│   │   ├── [id].tsx      # Detalle de una task list (todos)
│   │   └── create.tsx    # Crear nuevo todo
│   ├── createTaskList.tsx # Crear nueva task list
│   ├── login.tsx
│   └── register.tsx
├── components/           # Componentes reutilizables
├── hooks/                # Custom hooks (useLogin, useTodos, etc.)
├── services/             # Llamadas a la API y configuración de Firebase
│   ├── api.ts            # Instancia Axios con interceptores de auth
│   ├── auth/             # Firebase auth
│   ├── tasks/            # CRUD de todos
│   └── taskLists/        # CRUD de task lists
├── constants/            # Temas y colores
└── types/                # Tipos TypeScript compartidos
```
