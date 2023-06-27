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
import { Add, Delete, DragHandle, ExpandMore } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { arrayMoveImmutable } from "array-move";
import { Container, Draggable } from "@smooth-dnd/react";

import { WorkExperienceItem } from "../../../App";
import DatePickerWithClearButton from "../DatePickerWithClearButton";
import { objectsEqual } from "../../Utils/Utils";

export default function WorkExperience({
  workExperience,
  setWorkExperience,
}: {
  workExperience: WorkExperienceItem[];
  setWorkExperience: (newValue: WorkExperienceItem[]) => void;
}) {
  const addNewWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { institution: "", position: "", endDate: null, startDate: null },
    ]);
  };

  const updateWorkExperienceItem =
    (index: number) => (workExperienceItem: WorkExperienceItem) => {
      if (!objectsEqual(workExperience[index], workExperienceItem)) {
        let newWorkExperiences = [...workExperience];
        newWorkExperiences[index] = workExperienceItem;
        setWorkExperience(newWorkExperiences);
      }
    };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    setWorkExperience(
      arrayMoveImmutable(workExperience, removedIndex || 0, addedIndex || 0)
    );
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel4a-content"
        id="work-experience-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Work Experience</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={onDrop}
          >
            {workExperience.map((workExperienceItem, index) => (
              <Draggable key={JSON.stringify(workExperienceItem)}>
                <WorkExperienceElement
                  index={index}
                  workExperienceItem={workExperienceItem}
                  updateWorkExperienceItem={updateWorkExperienceItem(index)}
                  deleteItem={() =>
                    setWorkExperience(
                      workExperience.filter((s) => s !== workExperienceItem)
                    )
                  }
                />
              </Draggable>
            ))}
          </Container>
          <ListItem>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => addNewWorkExperience()}
            >
              Add Work Experience
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function WorkExperienceElement({
  index,
  deleteItem,
  updateWorkExperienceItem,
  workExperienceItem,
}: {
  index: number;
  deleteItem: () => void;
  workExperienceItem: WorkExperienceItem;
  updateWorkExperienceItem: (workExperienceItem: WorkExperienceItem) => void;
}) {
  return (
    <ListItem sx={{ alignItems: "flex-start" }}>
      <ListItemIcon sx={{ minWidth: "24px", mt: "26px" }}>
        <Typography>{index + 1}.</Typography>
      </ListItemIcon>
      <List sx={{ paddingTop: 0, width: "100%" }}>
        <ListItem>
          <TextField
            variant="standard"
            label="Institution"
            defaultValue={workExperienceItem.institution}
            onBlur={(e) =>
              updateWorkExperienceItem({
                ...workExperienceItem,
                institution: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            label="Position"
            defaultValue={workExperienceItem.position}
            onBlur={(e) =>
              updateWorkExperienceItem({
                ...workExperienceItem,
                position: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <DatePicker
            label="Start date"
            value={workExperienceItem.startDate}
            onChange={(value) =>
              updateWorkExperienceItem({
                ...workExperienceItem,
                startDate: value,
              })
            }
            slotProps={{ textField: { variant: "standard" } }}
          />
        </ListItem>
        <ListItem>
          <DatePickerWithClearButton
            label="End date"
            value={workExperienceItem.endDate}
            onChange={(value) =>
              updateWorkExperienceItem({
                ...workExperienceItem,
                endDate: value,
              })
            }
            variant="standard"
          />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemIcon
            className="drag-handle"
            sx={{ cursor: "pointer", minWidth: "24px", mt: "8px" }}
          >
            <DragHandle />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <IconButton
            size="small"
            edge="start"
            color="error"
            aria-label="delete work experience item"
            onClick={deleteItem}
          >
            <Delete />
          </IconButton>
        </ListItem>
      </List>
    </ListItem>
  );
}
