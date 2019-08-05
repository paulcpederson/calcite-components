import { storiesOf } from "@storybook/html";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs/polymer";
import { action } from "@storybook/addon-actions";
import markdown from "./readme.md";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add(
    "default",
    () => {
      const el = document.createElement("calcite-button");
      el.innerHTML = "Default";
      el.color = select("color", ["blue", "dark", "light", "red"], "blue");
      el.appearance = select(
        "appearance",
        ["solid", "outline", "clear", "inline"],
        "solid"
      );
      el.scale = select("scale", ["xs", "s", "m", "l", "xl"], "m");
      el.width = select("scale", ["auto", "half", "full"], "auto");
      el.loading = boolean("loading", false);
      el.href = text("href", null);
      el.icon = text("icon", null);
      return el;
    },
    { notes: { markdown } }
  );
