import { useState } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  SxProps,
  TextField,
} from "@mui/material";
import { Delete, Circle, Add, DragHandle } from "@mui/icons-material";
import { arrayMoveImmutable } from "array-move";
import { Container, Draggable } from "@smooth-dnd/react";

export function EditableList({
  items,
  setItems,
  label,
  size,
  addButtonSxProps,
}: {
  items: string[];
  setItems: (items: string[]) => void;
  label: string;
  size?: "medium" | "small";
  addButtonSxProps?: SxProps;
}) {
  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    console.log({ removedIndex, addedIndex });
    setItems(arrayMoveImmutable(items, removedIndex || 0, addedIndex || 0));
  };

  let [addingNewItem, setAddingNewItem] = useState(false);

  const addNewItem = (newItem: string) => {
    if (newItem) {
      setItems([...items, newItem]);
    }
    setAddingNewItem(false);
  };

  const updateItem = (index: number, item: string) => {
    if (items[index] !== item) {
      let newItems = [...items];
      newItems[index] = item;
      setItems(newItems);
    }
  };

  return (
    <List sx={{ width: "100%" }}>
      <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
        {items.map((item, index) => (
          <Draggable key={item}>
            <ListItem sx={size === "small" ? { pl: 0, pr: 0 } : undefined}>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <Circle sx={{ fontSize: ".6rem", fill: "black" }} />
              </ListItemIcon>
              <TextField
                size={size || undefined}
                variant="standard"
                defaultValue={item}
                onBlur={(e) =>
                  updateItem(index, (e.target as HTMLInputElement).value)
                }
              />
              <IconButton
                size="small"
                edge="start"
                color="error"
                aria-label="delete item"
                sx={size === "small" ? undefined : { ml: 2, mr: 2 }}
                onClick={() => setItems(items.filter((s) => s !== item))}
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
      {addingNewItem ? (
        <ListItem
          key={"new item"}
          sx={size === "small" ? { pl: 0, pr: 0 } : undefined}
        >
          <ListItemIcon sx={{ minWidth: "24px" }}>
            <Circle sx={{ fontSize: ".6rem", fill: "black" }} />
          </ListItemIcon>
          <TextField
            size={size || undefined}
            variant="standard"
            autoFocus
            onBlur={(e) => addNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNewItem((e.target as unknown as { value: string }).value);
                (e.target as unknown as { value: string }).value = "";
                setAddingNewItem(true);
              }
            }}
          />
        </ListItem>
      ) : null}
      <ListItem sx={size === "small" ? { pl: 0, pr: 0 } : undefined}>
        <Button
          size={size}
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setAddingNewItem(true)}
          sx={addButtonSxProps}
        >
          Add {label}
        </Button>
      </ListItem>
    </List>
  );
}
