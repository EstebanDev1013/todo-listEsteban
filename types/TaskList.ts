//esto es un tipo con todo lo que va a llevar un componente

export type TaskList = {
  id: string;
  title: string;
  subtitle: string;
  percentage: number;
  tags: string[];
  idColor?: string; // el signo ? significa que es opcional recibir estos datos en el componente.
  idIcon?: string;
};
