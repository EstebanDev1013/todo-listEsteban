import { Platform } from "react-native";
import { view } from "./storybook.requires";

const StorybookUIRoot = view.getStorybookUI({
  storage:
    Platform.OS !== "web"
      ? {
          getItem: require("@react-native-async-storage/async-storage").default
            .getItem,
          setItem: require("@react-native-async-storage/async-storage").default
            .setItem,
        }
      : undefined,
});

export default StorybookUIRoot;
