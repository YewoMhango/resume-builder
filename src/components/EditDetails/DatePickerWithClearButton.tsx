import { Box, Button, TextFieldVariants } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

export default function DatePickerWithClearButton({
  value,
  label,
  maxDate,
  variant,
  onChange,
  buttonVariant,
}: {
  value: DateTime | null;
  label?: string;
  maxDate?: DateTime;
  variant?: TextFieldVariants;
  onChange: (value: DateTime | null) => void;
  buttonVariant?: "outlined" | "text" | "contained";
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        maxDate={maxDate}
        slotProps={{ textField: { variant } }}
      />
      {value ? (
        <Button
          variant={buttonVariant || "text"}
          sx={{ ml: 2 }}
          onClick={() => onChange(null)}
        >
          Clear
        </Button>
      ) : null}
    </Box>
  );
}
