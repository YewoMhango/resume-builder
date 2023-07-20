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
import { ExpandMore, Add, Delete, DragHandle } from "@mui/icons-material";
import { arrayMoveImmutable } from "array-move";
import { Container, Draggable } from "@smooth-dnd/react";

import { OtherExperienceItem } from "../../../App";
import DatePickerWithClearButton from "../DatePickerWithClearButton";
import { objectsEqual } from "../../Utils/Utils";

export default function OtherExperience({
  otherExperience,
  setOtherExperience,
}: {
  otherExperience: OtherExperienceItem[];
  setOtherExperience: (newValue: OtherExperienceItem[]) => void;
}) {
  const addNewOtherExperience = () => {
    setOtherExperience([
      ...otherExperience,
      { place: "", work: "", endDate: null, startDate: null },
    ]);
  };

  const updateOtherExperienceItem =
    (index: number) => (otherExperienceItem: OtherExperienceItem) => {
      if (!objectsEqual(otherExperience[index], otherExperienceItem)) {
        let newOtherExperiences = [...otherExperience];
        newOtherExperiences[index] = otherExperienceItem;
        setOtherExperience(newOtherExperiences);
      }
    };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    setOtherExperience(
      arrayMoveImmutable(otherExperience, removedIndex || 0, addedIndex || 0)
    );
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel4a-content"
        id="other-experiences-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Other Experiences</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={onDrop}
          >
            {otherExperience.map((otherExperienceItem, index) => (
              <Draggable key={JSON.stringify(otherExperienceItem)}>
                <OtherExperienceElement
                  index={index}
                  otherExperienceItem={otherExperienceItem}
                  updateOtherExperienceItem={updateOtherExperienceItem(index)}
                  deleteItem={() =>
                    setOtherExperience(
                      otherExperience.filter((s) => s !== otherExperienceItem)
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
              onClick={() => addNewOtherExperience()}
            >
              Add Other Experience
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function OtherExperienceElement({
  index,
  deleteItem,
  updateOtherExperienceItem,
  otherExperienceItem,
}: {
  index: number;
  deleteItem: () => void;
  otherExperienceItem: OtherExperienceItem;
  updateOtherExperienceItem: (otherExperienceItem: OtherExperienceItem) => void;
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
            label="Place"
            defaultValue={otherExperienceItem.place}
            onBlur={(e) =>
              updateOtherExperienceItem({
                ...otherExperienceItem,
                place: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            label="Work"
            defaultValue={otherExperienceItem.work}
            onBlur={(e) =>
              updateOtherExperienceItem({
                ...otherExperienceItem,
                work: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <DatePickerWithClearButton
            label="Start date"
            value={otherExperienceItem.startDate}
            onChange={(value) =>
              updateOtherExperienceItem({
                ...otherExperienceItem,
                startDate: value,
              })
            }
            variant="standard"
          />
        </ListItem>
        <ListItem>
          <DatePickerWithClearButton
            label="End date"
            value={otherExperienceItem.endDate}
            onChange={(value) =>
              updateOtherExperienceItem({
                ...otherExperienceItem,
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
