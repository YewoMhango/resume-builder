import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { EditableList } from "./EditableList";

export default function Languages({
  languages,
  setLanguages,
}: {
  languages: string[];
  setLanguages: (languages: string[]) => void;
}) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel5a-content"
        id="languages-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Languages</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EditableList
          items={languages}
          setItems={setLanguages}
          label="Language"
        />
      </AccordionDetails>
    </Accordion>
  );
}
