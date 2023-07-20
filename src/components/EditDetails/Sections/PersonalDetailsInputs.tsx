import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { DateTime } from "luxon";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import ReactPhoneInput from "react-phone-input-material-ui";

import { Gender, MaritalStatus, PersonalDetails } from "../../../App";
import DatePickerWithClearButton from "../DatePickerWithClearButton";

export default function PersonalDetailsInputs({
  personalDetails,
  setPersonalDetails,
}: {
  personalDetails: PersonalDetails;
  setPersonalDetails: (details: PersonalDetails) => void;
}) {
  let updateField = (fieldName: keyof PersonalDetails, value: any) => {
    if (personalDetails[fieldName] != value) {
      setPersonalDetails({ ...personalDetails, [fieldName as string]: value });
    }
  };

  // Have to register the languages you want to use
  countries.registerLocale(enLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="personal-details-header"
        expandIcon={<ExpandMore />}
      >
        <Typography variant="h6">Personal Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer className="personal-details-table">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>First name:</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    label="First name"
                    defaultValue={personalDetails.firstName}
                    onBlur={(e) => updateField("firstName", e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Last name:</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Last name"
                    defaultValue={personalDetails.lastName}
                    onBlur={(e) => updateField("lastName", e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Occupation:</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Occupation"
                    defaultValue={personalDetails.occupation}
                    onBlur={(e) => updateField("occupation", e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Gender:</Typography>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      label="Gender"
                      value={personalDetails.gender}
                      onChange={(e) =>
                        updateField("gender", e.target.value || null)
                      }
                    >
                      <MenuItem>I'd rather not say</MenuItem>
                      <MenuItem value={Gender.Male}>Male</MenuItem>
                      <MenuItem value={Gender.Female}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Birth date:</Typography>
                </TableCell>
                <TableCell>
                  <DatePickerWithClearButton
                    label="Birth date"
                    value={personalDetails.birthDate}
                    onChange={(value) => updateField("birthDate", value)}
                    maxDate={DateTime.now()}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Marital Status:</Typography>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel id="marital-status-label">
                      Marital Status
                    </InputLabel>
                    <Select
                      labelId="marital-status-label"
                      label="Marital Status"
                      value={personalDetails.maritalStatus}
                      onChange={(e) =>
                        updateField("maritalStatus", e.target.value)
                      }
                    >
                      <MenuItem>I'd rather not say</MenuItem>
                      <MenuItem value={MaritalStatus.Single}>Single</MenuItem>
                      <MenuItem value={MaritalStatus.Married}>Married</MenuItem>
                      <MenuItem value={MaritalStatus.Widowed}>Widowed</MenuItem>
                      <MenuItem value={MaritalStatus.Divorced}>
                        Divorced
                      </MenuItem>
                      <MenuItem value={MaritalStatus.Separated}>
                        Separated
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Nationality:</Typography>
                </TableCell>
                <TableCell>
                  <FormControl>
                    <InputLabel id="nationality-label">Nationality</InputLabel>
                    <Select
                      value={personalDetails.nationality}
                      onChange={(e) =>
                        updateField("nationality", e.target.value)
                      }
                      sx={{ minWidth: "150px" }}
                      labelId="nationality-label"
                      label="Nationality"
                    >
                      {!!countryArr?.length &&
                        countryArr.map(({ label, value }) => (
                          <MenuItem key={value} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Phone:</Typography>
                </TableCell>
                <TableCell>
                  <ReactPhoneInput
                    value={personalDetails.cellPhone}
                    onChange={(_newValue, _data, event) =>
                      setPersonalDetails({
                        ...personalDetails,
                        cellPhone: event.target.value,
                      })
                    }
                    component={TextField}
                    label="Phone Number"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hide-when-small">
                  <Typography>Email:</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    defaultValue={personalDetails.email}
                    onBlur={(e) => updateField("email", e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
