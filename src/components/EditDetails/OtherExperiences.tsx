import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export function OtherExperiences() {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel4a-content"
        id="other-experiences-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Other Experiences</Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
}
