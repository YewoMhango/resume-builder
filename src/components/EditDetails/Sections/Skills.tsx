import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { EditableList } from "./EditableList";

export default function Skills({
  skills,
  setSkills,
}: {
  skills: string[];
  setSkills: (skills: string[]) => void;
}) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel5a-content"
        id="skills-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Skills</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EditableList items={skills} setItems={setSkills} label="Skill" />
      </AccordionDetails>
    </Accordion>
  );
}
