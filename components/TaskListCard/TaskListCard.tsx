//Es buena práctica hacer una carpea por componente para todos los archivos relacionados a ese componente

import React from "react";
import { Pressable } from "react-native";
import { TaskList } from "../../types/TaskList";
import { Box } from "../ui/box";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import { Text } from "../ui/text";

const TaskListCard: React.FC<{ item: TaskList }> = ({ item }) => {
  //React.FC es un tipo de React que se utiliza para definir componentes funcionales. El tipo entre <> es el tipo de las props que recibe el componente. En este caso, el componente recibe una prop llamada "item" que es de tipo "TaskList".
  //Es buena práctica empezar con variables, useState, hook que regrese información
  //funciones

  //useEffects

  //render
  return (
    //pressable es un botón
    <Pressable className="p-4 border border-gray-300 rounded-xl mb-3">
      {/* Titulo */}
      <Text className="text-lg font-semibold">{item.title}</Text>
      {/* Subtitulo */}
      <Text className="text-gray-500 text-sm mb-2">{item.subtitle}</Text>

      {/* Progress */}
      <Box className="mb-3">
        <Progress value={item.percentage} size="md">
          <ProgressFilledTrack />
        </Progress>
        <Text className="text-xs text-gray-500 mt-1">
          {item.percentage}% completed
        </Text>
      </Box>
      {/* Tags */}
    </Pressable>
  );
};

export default TaskListCard;
