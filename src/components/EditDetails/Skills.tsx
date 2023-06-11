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

import { Container, Draggable } from "../../react-smooth-dnd/src";

export default function Skills({
  skills,
  setSkills,
}: {
  skills: string[];
  setSkills: (skills: string[]) => void;
}) {
  let [newSkill, setNewSkill] = useState<string | null>(null);

  const addNewSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill(null);
  };

  const updateSkill = (index: number, skill: string) => {
    let newSkills = [...skills];
    newSkills[index] = skill;
    setSkills(newSkills);
  };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    console.log({ removedIndex, addedIndex });
    setSkills(arrayMoveImmutable(skills, removedIndex || 0, addedIndex || 0));
  };

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
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={onDrop}
          >
            {skills.map((skill, index) => (
              <Draggable key={skill}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "24px" }}>
                    <Circle sx={{ fontSize: ".6rem", fill: "black" }} />
                  </ListItemIcon>
                  <TextField
                    variant="standard"
                    defaultValue={skill}
                    onBlur={(e) =>
                      updateSkill(index, (e.target as HTMLInputElement).value)
                    }
                  />
                  <IconButton
                    size="small"
                    edge="start"
                    color="error"
                    aria-label="delete skill"
                    sx={{ ml: 2, mr: 2 }}
                    onClick={() => setSkills(skills.filter((s) => s !== skill))}
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
          {newSkill != null ? (
            <ListItem key={newSkill}>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <Circle sx={{ fontSize: ".6rem", fill: "black" }} />
              </ListItemIcon>
              <TextField
                value={newSkill || undefined}
                variant="standard"
                autoFocus
                onChange={(e) => setNewSkill(e.target.value)}
                onBlur={addNewSkill}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNewSkill();
                    setNewSkill("");
                  }
                }}
              />
            </ListItem>
          ) : null}
          <ListItem>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setNewSkill("")}
            >
              Add Skill
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
