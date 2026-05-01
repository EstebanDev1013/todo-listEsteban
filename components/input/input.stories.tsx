// components/input.stories.tsx
import { Meta, StoryObj } from "@storybook/react-native";
import { Input } from "./input";

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;
//Variante 1
export const Basic: Story = {
  args: {
    label: "First Name",
    placeholder: "John",
  },
};

//Variante 2
export const Error: Story = {
  args: {
    label: "Email",
    error: "Email is required",
    disabled: false,
    placeholder: "example@example.com",
  },
};
//Variante 3
export const Disabled: Story = {
  args: {
    label: "Disabled",
    error: "",
    disabled: true,
    placeholder: "Disabled",
  },
};