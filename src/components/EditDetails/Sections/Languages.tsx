import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import {
  ExpandMore,
  Delete,
  Circle,
  Add,
  DragHandle,
} from "@mui/icons-material";
import { arrayMoveImmutable } from "array-move";
import { Container, Draggable } from "@smooth-dnd/react";

export default function Languages({
  languages,
  setLanguages,
}: {
  languages: string[];
  setLanguages: (languages: string[]) => void;
}) {
  let [addingNewLanguage, setAddingNewLanguage] = useState(false);

  const addNewLanguage = (newLanguage: string) => {
    if (newLanguage) {
      setLanguages([...languages, newLanguage]);
    }
    setAddingNewLanguage(false);
  };

  const updateLanguage = (index: number, language: string) => {
    let newLanguages = [...languages];
    newLanguages[index] = language;
    setLanguages(newLanguages);
  };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    console.log({ removedIndex, addedIndex });
    setLanguages(
      arrayMoveImmutable(languages, removedIndex || 0, addedIndex || 0)
    );
  };

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
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={onDrop}
          >
            {languages.map((language, index) => (
              <Draggable key={language}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "24px" }}>
                    <Circle sx={{ fontSize: ".6rem", fill: "black" }} />
                  </ListItemIcon>
                  <TextField
                    variant="standard"
                    defaultValue={language}
                    onBlur={(e) =>
                      updateLanguage(
                        index,
                        (e.target as HTMLInputElement).value
                      )
                    }
                  />
                  <IconButton
                    size="small"
                    edge="start"
                    color="error"
                    aria-label="delete language"
                    sx={{ ml: 2, mr: 2 }}
                    onClick={() =>
                      setLanguages(languages.filter((s) => s !== language))
                    }
                  >
                    <Delete />
                  </IconButton>
                  <ListItemIcon
                    className="drag-handle"
                    sx={{ cursor: "pointer", minWidth: 24 }}
                  >
                    <DragHandle />
                  </ListItemIcon>
                </ListItem>
              </Draggable>
            ))}
          </Container>
          {addingNewLanguage ? (
            <ListItem key={"new language"}>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <Circle sx={{ fontSize: ".6rem", fill: "black" }} />
              </ListItemIcon>
              <TextField
                variant="standard"
                autoFocus
                onBlur={(e) => addNewLanguage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNewLanguage(
                      (e.target as unknown as { value: string }).value
                    );
                    (e.target as unknown as { value: string }).value = "";
                    setAddingNewLanguage(true);
                  }
                }}
              />
            </ListItem>
          ) : null}
          <ListItem>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setAddingNewLanguage(true)}
            >
              Add Language
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
