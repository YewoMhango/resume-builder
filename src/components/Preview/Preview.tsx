import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import styles from "./Preview.module.scss";
import { ResumeData } from "../../App";
import BasicTheme from "./Themes/BasicTheme/BasicTheme";

export default function Preview({ resumeData }: { resumeData: ResumeData }) {
  return (
    <Container maxWidth="md" className={styles.previewContainer}>
      <Box
        className="hide-when-printing"
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography display="inline-flex">Theme:</Typography>&nbsp;
        <FormControl sx={{ width: "fit-content" }} size="small">
          <InputLabel id="theme-label">Theme</InputLabel>
          <Select labelId="theme-label" label="Theme" defaultValue="Basic">
            <MenuItem value="Basic">Basic</MenuItem>
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
        <BasicTheme resumeData={resumeData} />
      </Box>
    </Container>
  );
}
