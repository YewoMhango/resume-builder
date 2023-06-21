import { Container } from "@mui/material";

import { ResumeData } from "../../App";
import AboutYou from "./Sections/AboutYou";
import EducationalBackground from "./Sections/EducationalBackground";
import Languages from "./Sections/Languages";
import OtherExperience from "./Sections/OtherExperiences";
import PersonalDetailsInputs from "./Sections/PersonalDetailsInputs";
import Referees from "./Sections/Referees";
import Skills from "./Sections/Skills";
import WorkExperience from "./Sections/WorkExperience";

export default function EditDetails({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeData;
  setResumeData: (newData: ResumeData) => void;
}) {
  return (
    <Container maxWidth="md">
      <PersonalDetailsInputs
        personalDetails={resumeData.personalDetails}
        setPersonalDetails={(newDetails) =>
          setResumeData({ ...resumeData, personalDetails: newDetails })
        }
      />
      <AboutYou
        about={resumeData.about}
        setAbout={(newValue) =>
          setResumeData({ ...resumeData, about: newValue })
        }
      />
      <EducationalBackground
        educationalBackground={resumeData.educationalBackground}
        setEducationalBackground={(newDetails) =>
          setResumeData({ ...resumeData, educationalBackground: newDetails })
        }
      />
      <WorkExperience
        workExperience={resumeData.workExperience}
        setWorkExperience={(newDetails) =>
          setResumeData({ ...resumeData, workExperience: newDetails })
        }
      />
      <OtherExperience
        otherExperience={resumeData.otherExperiences}
        setOtherExperience={(newDetails) =>
          setResumeData({ ...resumeData, otherExperiences: newDetails })
        }
      />
      <Skills
        skills={resumeData.skills}
        setSkills={(skills) => setResumeData({ ...resumeData, skills })}
      />
      <Languages
        languages={resumeData.languages}
        setLanguages={(languages) =>
          setResumeData({ ...resumeData, languages })
        }
      />
      <Referees
        referees={resumeData.referees}
        setReferees={(referees) => setResumeData({ ...resumeData, referees })}
      />
    </Container>
  );
}
