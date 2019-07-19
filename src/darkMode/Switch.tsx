import * as React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { Text, StyleGuide } from "../components";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: StyleGuide.spacing * 2,
    alignItems: "center"
  },
  switch: {
    marginRight: StyleGuide.spacing
  }
});

export default ({ value, onValueChange }: SwitchProps) => {
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        trackColor={{
          false: StyleGuide.palette.primary,
          true: StyleGuide.palette.primary
        }}
        {...{ value, onValueChange }}
      />
      <Icon name={value ? "sun" : "moon"} size={32} />
    </View>
  );
};