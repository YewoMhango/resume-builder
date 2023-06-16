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

export default function Preview({ resumeData }: { resumeData: ResumeData }) {
  let [resumeTheme, setResumeTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme | null) || Theme.Basic
  );

  let updateTheme = (themeName: Theme) => {
    setResumeTheme(themeName);
    localStorage.setItem("theme", themeName);
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
          <ContrastTheme resumeData={resumeData} />
        ) : (
          <BasicTheme resumeData={resumeData} />
        )}
      </Box>
    </Container>
  );
}
