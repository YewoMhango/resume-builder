import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useState } from "react";

import styles from "./Preview.module.scss";
import { ResumeData } from "../../App";
import BasicTheme from "./Themes/BasicTheme/BasicTheme";
import ContrastTheme from "./Themes/ContrastTheme/ContrastTheme";

enum Theme {
  Basic = "Basic",
  Contrast = "Contrast",
}

export type ThemeConfig = {
  fontSize: number;
};

export default function Preview({ resumeData }: { resumeData: ResumeData }) {
  let [resumeTheme, setResumeTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme | null) || Theme.Basic
  );
  let [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    fontSize: fontSizeForTheme(resumeTheme),
  });

  let updateTheme = (themeName: Theme) => {
    setResumeTheme(themeName);
    localStorage.setItem("theme", themeName);
    setThemeConfig({ ...themeConfig, fontSize: fontSizeForTheme(themeName) });
  };

  return (
    <Container maxWidth="md" className={styles.previewContainer}>
      <Box className="hide-when-printing">
        <FormControl sx={{ width: "fit-content" }} size="small">
          <InputLabel id="theme-label">Template</InputLabel>
          <Select
            labelId="theme-label"
            label="Template"
            value={resumeTheme}
            onChange={(e) => updateTheme(e.target.value as Theme)}
          >
            <MenuItem value={Theme.Basic}>Basic</MenuItem>
            <MenuItem value={Theme.Contrast}>Contrast</MenuItem>
          </Select>
        </FormControl>
        &nbsp;
        <FormControl sx={{ width: "100px" }} size="small">
          <InputLabel id="font-size-label">Font size</InputLabel>
          <Select
            labelId="font-size-label"
            label="Font size"
            value={themeConfig.fontSize}
            onChange={(e) =>
              setThemeConfig({
                ...themeConfig,
                fontSize: Number(e.target.value),
              })
            }
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br className="hide-when-printing" />
      <Box
        className={styles.previewPage}
        sx={{
          overflowY: "scroll",
          width: "fit-content",
          maxWidth: "100%",
          backgroundColor: "white",
        }}
      >
        {resumeTheme === Theme.Contrast ? (
          <ContrastTheme resumeData={resumeData} themeConfig={themeConfig} />
        ) : (
          <BasicTheme resumeData={resumeData} themeConfig={themeConfig} />
        )}
      </Box>
    </Container>
  );
}

function fontSizeForTheme(resumeTheme: Theme): number {
  return resumeTheme === Theme.Basic ? 12 : 10;
}
