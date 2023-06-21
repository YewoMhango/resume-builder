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

import { Referee } from "../../../App";

export default function Referees({
  referees,
  setReferees,
}: {
  referees: Referee[];
  setReferees: (newValue: Referee[]) => void;
}) {
  const addNewReferee = () => {
    setReferees([
      ...referees,
      { name: "", address: "", email: "", institution: "", phone: "" },
    ]);
  };

  const updateRefereeItem = (index: number) => (referee: Referee) => {
    let newReferees = [...referees];
    newReferees[index] = referee;
    setReferees(newReferees);
  };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    setReferees(
      arrayMoveImmutable(referees, removedIndex || 0, addedIndex || 0)
    );
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel6a-content"
        id="referees-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Referees</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={onDrop}
          >
            {referees.map((referee, index) => (
              <Draggable key={JSON.stringify(referee)}>
                <RefereeElement
                  index={index}
                  referee={referee}
                  updateRefereeItem={updateRefereeItem(index)}
                  deleteItem={() =>
                    setReferees(referees.filter((s) => s !== referee))
                  }
                />
              </Draggable>
            ))}
          </Container>
          <ListItem>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => addNewReferee()}
            >
              Add Referee
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function RefereeElement({
  index,
  deleteItem,
  updateRefereeItem,
  referee,
}: {
  index: number;
  deleteItem: () => void;
  referee: Referee;
  updateRefereeItem: (referee: Referee) => void;
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
            label="Name"
            defaultValue={referee.name}
            onBlur={(e) =>
              updateRefereeItem({
                ...referee,
                name: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            label="Institution"
            defaultValue={referee.institution}
            onBlur={(e) =>
              updateRefereeItem({
                ...referee,
                institution: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            label="Address"
            defaultValue={referee.address}
            onBlur={(e) =>
              updateRefereeItem({
                ...referee,
                address: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            label="Email"
            type="email"
            defaultValue={referee.email}
            onBlur={(e) =>
              updateRefereeItem({
                ...referee,
                email: e.target.value,
              })
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            variant="standard"
            label="Phone number"
            type="tel"
            defaultValue={referee.phone}
            onBlur={(e) =>
              updateRefereeItem({
                ...referee,
                phone: e.target.value,
              })
            }
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
