import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { BabelFileResult, NodePath, transformSync } from "@babel/core";

/**
 * Accepts a stringified file and, if deprecated string is found, returns updated string
 *
 * @param fileContentsAsString
 * @returns { string | void }
 */
export const simpleConvert = (fileContentsAsString: string): string | void => {
  const visitor = {
    JSXAttribute(path: NodePath<any>) {
      if (
        path.node.name.name === "className" &&
        path.node?.value?.value === "deprecated-class"
      ) {
        path.node.value.value = "new-class";
      }
    },
  };

  const result: BabelFileResult | null = transformSync(fileContentsAsString, {
    filename: "SimpleComponent.jsx",
    plugins: [
      {
        visitor,
      },
    ],
    presets: ["@babel/preset-react"],
  });

  if (!result) {
    return "No result";
  }

  const { code } = result;
  if (code && typeof code === "string") {
    const regex = /React\.createElement\("([^"]+)",([^,]+),([^)]+)\)/;
    const match = code.match(regex) ?? "";
    const type = match[1];
    const props = eval("(" + match[2].replace(/\n/g, "") + ")");
    const children = JSON.parse(match[3]);
    return ReactDOMServer.renderToString(
      React.createElement(type, props, children)
    );
  }
};
