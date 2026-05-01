import { Meta, StoryObj } from "@storybook/react-native";
import { TaskItem } from "./task-item";

const meta = {
  component: TaskItem,
} satisfies Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

// Variante 1
export const Default: Story = {
  args: {
    title: "Buy groceries",
    completed: false,
  },
};

// Variante 2
export const Completed: Story = {
  args: {
    title: "Buy groceries",
    completed: true,
  },
};

// Variante 3
export const LongTitle: Story = {
  args: {
    title: "This is a very long task title that should wrap to the next line correctly",
    completed: false,
  },
};