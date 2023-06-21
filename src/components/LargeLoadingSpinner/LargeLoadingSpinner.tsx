import { CSSProperties } from "react";

import styles from "./LargeLoadingSpinner.module.css";

/**
 * A loading spinner made using just HTML and CSS
 */
export default function LargeLoadingSpinner({
  secondaryColor,
  primaryColor,
  linethickNess,
  margin,
  size,
}: {
  secondaryColor?: string;
  primaryColor?: string;
  size?: number;
  margin?: string;
  linethickNess?: string;
}) {
  return (
    <div
      className={styles["loading-spinner-large"]}
      style={
        {
          "--secondary-color": secondaryColor || "rgba(0, 0, 0, 0.2)",
          "--primary-color": primaryColor || "#1976d2",
          width: `${size}px`,
          height: `${size}px`,
          margin: margin,
          borderWidth: linethickNess,
        } as CSSProperties
      }
    ></div>
  );
}
