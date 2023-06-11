import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";

import "./App.css";
import EditDetails from "./components/EditDetails/EditDetails";
import Preview from "./components/Preview/Preview";
import TopToolbar from "./components/TopToolbar";
import Footer from "./components/Footer";
import { useDebouncedAction } from "./components/Utils/Hooks";

export enum CurrentTab {
  Edit = "Edit",
  Preview = "Preview",
}

export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Widowed = "Widowed",
  Divorced = "Divorced",
  Separated = "Separated",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  occupation: string;
  gender: Gender;
  birthDate: DateTime | null;
  languages: string[];
  maritalStatus: MaritalStatus;
  nationality: string;
  cellPhone: string;
  email: string;
};

export type WorkExperienceItem = {
  institution: string;
  position: string;
  startDate: DateTime | null;
  endDate: DateTime | null;
};

export type OtherExperienceItem = {
  place: string;
  work: string;
  startDate: DateTime | null;
  endDate: DateTime | null;
};

export type Referee = {
  name: string;
  address: string;
  institution: string;
  phone: string;
  email: string;
};

export type EducationalBackgroundItem = {
  school: string;
  program: string;
  startDate: DateTime | null;
  endDate: DateTime | null;
};

export type ResumeData = {
  personalDetails: PersonalDetails;
  about: string;
  educationalBackground: EducationalBackgroundItem[];
  workExperience: WorkExperienceItem[];
  otherExperiences: OtherExperienceItem[];
  skills: string[];
  referees: Referee[];
};

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
});

export default function App() {
  let [currentTab, setCurrentTab] = useState(CurrentTab.Edit);
  let [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("resumeData") || "null");

    if (localData) {
      setResumeData({
        ...localData,
        personalDetails: {
          ...localData.personalDetails,
          birthDate:
            localData.personalDetails.birthDate &&
            DateTime.fromISO(localData.personalDetails.birthDate),
        },
        educationalBackground: localData.educationalBackground.map(
          (value: { startDate?: string; endDate?: string }) => ({
            ...value,
            startDate: value.startDate && DateTime.fromISO(value.startDate),
            endDate: value.endDate && DateTime.fromISO(value.endDate),
          })
        ),
        workExperience: localData.workExperience.map(
          (value: { startDate?: string; endDate?: string }) => ({
            ...value,
            startDate: value.startDate && DateTime.fromISO(value.startDate),
            endDate: value.endDate && DateTime.fromISO(value.endDate),
          })
        ),
      });
    } else {
      setResumeData({
        personalDetails: {
          firstName: "",
          lastName: "",
          occupation: "",
          gender: Gender.Male,
          birthDate: null,
          languages: [],
          maritalStatus: MaritalStatus.Single,
          nationality: "",
          cellPhone: "",
          email: "",
        },
        about: "",
        educationalBackground: [],
        workExperience: [],
        otherExperiences: [],
        skills: [],
        referees: [],
      });
    }
  }, []);

  let debounce = useDebouncedAction();

  useEffect(() => {
    debounce(
      () =>
        resumeData &&
        localStorage.setItem("resumeData", JSON.stringify(resumeData)),
      1000
    );
  }, [resumeData]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Box>
          <TopToolbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {resumeData ? (
            <>
              {currentTab === CurrentTab.Edit ? (
                <EditDetails
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              ) : (
                <Preview resumeData={resumeData} />
              )}
            </>
          ) : (
            <Container maxWidth="md">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: "calc(100vh - 230px)",
                }}
              >
                <CircularProgress />
              </Box>
            </Container>
          )}
          <br />
        </Box>
        <Footer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
