import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function AboutYou({
  about,
  setAbout,
}: {
  about: string;
  setAbout: (newValue: string) => void;
}) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel2a-content"
        id="about-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">About You</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ margin: "16px" }}>
          <TextField
            defaultValue={about}
            onBlur={(e) => setAbout(e.target.value)}
            multiline
            minRows={4}
            variant="filled"
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
