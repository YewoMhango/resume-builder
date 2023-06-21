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
import { DatePicker } from "@mui/x-date-pickers";
import { arrayMoveImmutable } from "array-move";
import { Container, Draggable } from "@smooth-dnd/react";

import { EducationalBackgroundItem } from "../../../App";
import DatePickerWithClearButton from "../DatePickerWithClearButton";

export default function EducationalBackground({
  educationalBackground,
  setEducationalBackground,
}: {
  educationalBackground: EducationalBackgroundItem[];
  setEducationalBackground: (background: EducationalBackgroundItem[]) => void;
}) {
  const addNewEducationalBackground = () => {
    setEducationalBackground([
      ...educationalBackground,
      { school: "", program: "", endDate: null, startDate: null },
    ]);
  };

  const updateEducationalBackgroundItem =
    (index: number) =>
    (educationalBackgroundItem: EducationalBackgroundItem) => {
      let newEducationalBackgrounds = [...educationalBackground];
      newEducationalBackgrounds[index] = educationalBackgroundItem;
      setEducationalBackground(newEducationalBackgrounds);
    };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    setEducationalBackground(
      arrayMoveImmutable(
        educationalBackground,
        removedIndex || 0,
        addedIndex || 0
      )
    );
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel3a-content"
        id="educational-background-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Educational Background</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={onDrop}
          >
            {educationalBackground.map((educationalBackgroundItem, index) => (
              <Draggable key={JSON.stringify(educationalBackgroundItem)}>
                <EducationalBackgroundElement
                  index={index}
                  educationalBackgroundItem={educationalBackgroundItem}
                  updateEducationalBackgroundItem={updateEducationalBackgroundItem(
                    index
                  )}
                  deleteItem={() =>
                    setEducationalBackground(
                      educationalBackground.filter(
                        (s) => s !== educationalBackgroundItem
                      )
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
              onClick={() => addNewEducationalBackground()}
            >
              Add Education
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function EducationalBackgroundElement({
  index,
  deleteItem,
  updateEducationalBackgroundItem,
  educationalBackgroundItem,
}: {
  index: number;
  deleteItem: () => void;
  educationalBackgroundItem: EducationalBackgroundItem;
  updateEducationalBackgroundItem: (
    educationalBackgroundItem: EducationalBackgroundItem
  ) => void;
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
            label="School"
            defaultValue={educationalBackgroundItem.school}
            onBlur={(e) =>
              updateEducationalBackgroundItem({
                ...educationalBackgroundItem,
                school: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            label="Program"
            defaultValue={educationalBackgroundItem.program}
            onBlur={(e) =>
              updateEducationalBackgroundItem({
                ...educationalBackgroundItem,
                program: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <DatePicker
            label="Start date"
            value={educationalBackgroundItem.startDate}
            onChange={(value) =>
              updateEducationalBackgroundItem({
                ...educationalBackgroundItem,
                startDate: value,
              })
            }
            slotProps={{ textField: { variant: "standard" } }}
          />
        </ListItem>
        <ListItem>
          <DatePickerWithClearButton
            label="End date"
            value={educationalBackgroundItem.endDate}
            onChange={(value) =>
              updateEducationalBackgroundItem({
                ...educationalBackgroundItem,
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
