// import { useEffect, useState } from "react";
// import { FlatList, Pressable, RefreshControl } from "react-native";

// import TaskListCard from "@/components/TaskListCard/TaskListCard";
// import { Box } from "@/components/ui/box";
// import { Spinner } from "@/components/ui/spinner";
// import { Text } from "@/components/ui/text";
// import { TaskList } from "@/types/TaskList";
// import { SafeAreaView } from "react-native-safe-area-context"; //Es para que la pantalla tome en cuenta la barra de hasta arriba donde va la hora, el wifi, etc.

// const MOCK_TASK_LISTS: TaskList[] = [
//   {
//     id: "1",
//     title: "Computer Science",
//     subtitle: "Algorithms and data structures",
//     percentage: 60,
//     tags: ["school", "important"],
//     idColor: "bg-blue-500",
//     idIcon: "code",
//   },
//   {
//     id: "2",
//     title: "History",
//     subtitle: "World War II notes",
//     percentage: 30,
//     tags: ["reading"],
//     idColor: "bg-green-500",
//     idIcon: "menu-book",
//   },
//   {
//     id: "3",
//     title: "Math",
//     subtitle: "Calculus exercises",
//     percentage: 90,
//     tags: ["practice", "exam"],
//     idColor: "bg-purple-500",
//     idIcon: "functions",
//   },
// ];

// export default function HomeScreen() {
//   const [lists /* estas son variable que cambian el renderizado*/, setLists] =
//     useState<TaskList[]>([]); //useState es un hook. Es para poner variables que cambian el renderizado. El tipo entre <> es el tipo de dato que va a tener la variable. En este caso, la variable "lists" es un array de "TaskList". El valor inicial es un array vacío.
//   const [loading, setLoading] = useState<boolean>(true);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTaskLists = async (): Promise<TaskList[]> => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const shouldFail = Math.random() < 0.3;

//         if (shouldFail) {
//           reject(new Error("Failed to fetch lists"));
//         } else {
//           resolve(MOCK_TASK_LISTS);
//         }
//       }, 1000);
//     });
//   };

//   const loadLists = async (fromRefresh: boolean = false) => {
//     try {
//       setError(null);
//       if (fromRefresh) {
//         setLoading(true);
//       }
//       const data = await fetchTaskLists();
//       setLists(data);
//       if (fromRefresh) {
//         setLoading(false);
//       }
//     } catch (err) {
//       setError("Something went wrong");
//       setLists([]);
//     }
//   };

//   useEffect(() => {
//     //un useEffect lo primero que recibe es una función que se va a ejecutar cada vez que el componente se renderice. El segundo argumento es un array de dependencias. Si el array está vacío, la función se ejecuta solo una vez cuando el componente se monta.
//     const init = async () => {
//       //se crea esta función para poder usar async/await dentro del useEffect, ya que el useEffect no puede ser async directamente.
//       setLoading(true);
//       await loadLists();
//       setLoading(false);
//     };

//     init();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); /*El arreglo de dependencias se pone vacío para evitar que el componente se
//   renderice infinitamente. Se pone llena cuando quieres llamar de nuevo al useEffect
//   si algo en esa lista cambia */

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadLists();
//     setRefreshing(false);
//   };

//   return (
//     <SafeAreaView className="flex-1">
//       <Box className="flex-1 p-4">
//         <Text className="text-2xl mb-4">Task Lists</Text>

//         {/* Loading */}
//         {loading && (
//           <Box className="mt-4">
//             <Spinner size="large" color="grey" />
//           </Box>
//         )}

//         {/* Error */}
//         {!loading && error && (
//           <>
//             <Text className="text-red-500 mb-2">{error}</Text>
//             <Pressable onPress={() => loadLists(true)}>
//               <Text className="text-blue-500 underline">Retry</Text>
//             </Pressable>
//           </>
//         )}

//         {/* Empty */}
//         {!loading && !error && lists.length === 0 && (
//           <Text>No tasks available</Text>
//         )}

//         {/* List */}
//         {!loading && !error && (
//           <FlatList
//             data={lists}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => <TaskListCard item={item} />}
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//             }
//           />
//         )}
//       </Box>
//     </SafeAreaView>
//   );
// }
import { TaskList } from "@/types/TaskList";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import TaskListCard from "@/components/TaskListCard/TaskListCard";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { FlatList, Pressable, RefreshControl } from "react-native";

const MOCK_TASK_LISTS: TaskList[] = [
  {
    id: "1",
    title: "Computer Science",
    subtitle: "Algorithms and data structures",
    percentage: 60,
    tags: ["school", "important"],
    idColor: "bg-blue-500",
    idIcon: "code",
  },
  {
    id: "2",
    title: "History",
    subtitle: "World War II notes",
    percentage: 30,
    tags: ["reading"],
    idColor: "bg-green-500",
    idIcon: "menu-book",
  },
  {
    id: "3",
    title: "Math",
    subtitle: "Calculus exercises",
    percentage: 90,
    tags: ["practice", "exam"],
    idColor: "bg-purple-500",
    idIcon: "functions",
  },
];

export default function HomeScreen() {
  const [lists, setLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskLists = async (): Promise<TaskList[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.3;

        if (shouldFail) {
          reject(new Error("Failed to fetch lists"));
        } else {
          resolve(MOCK_TASK_LISTS);
        }
      }, 1000);
    });
  };

  const loadLists = async (fromRefresh: boolean = false) => {
    try {
      setError(null);
      if (fromRefresh) {
        setLoading(true);
      }
      const data = await fetchTaskLists();
      setLists(data);
      if (fromRefresh) {
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong");
      setLists([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadLists();
      setLoading(false);
    };

    init();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLists();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 p-4">
        <Text className="text-2xl mb-4">Task Lists</Text>

        {/** Loading */}
        {loading && (
          <Box className="mt-4">
            <Spinner size="large" color="grey" />
          </Box>
        )}

        {/** Error */}
        {!loading && error && (
          <>
            <Text className="text-red-500 mb-2">{error}</Text>
            <Pressable onPress={() => loadLists(true)}>
              <Text className="text-blue-500 underline">Retry</Text>
            </Pressable>
          </>
        )}

        {/** Empty */}
        {!loading && !error && lists.length === 0 && (
          <Text>No tasks available</Text>
        )}

        {/** List */}
        {!loading && !error && (
          <FlatList
            data={lists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskListCard item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </Box>
      <Box>
        <Link href="/storybook">Open Storybook</Link>
      </Box>
    </SafeAreaView>
  );
}
