import { useMemo } from "react";
import { createTheme, IPartialTheme } from "@fluentui/react";

export const useTheme = (themeJSON?: string) => {
  const theme = useMemo(() => {
    try {
      return themeJSON
        ? createTheme(JSON.parse(themeJSON) as IPartialTheme)
        : undefined;
    } catch (ex) {
      /* istanbul ignore next */
      console.error("Cannot parse theme", ex);
    }
  }, [themeJSON]);

  return theme;
};
