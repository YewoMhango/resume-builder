import { Container } from "@mui/material";

import { ResumeData } from "../../App";
import PersonalDetailsInputs from "./PersonalDetailsInputs";
import EducationalBackground from "./EducationalBackground";
import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Referees from "./Referees";
import AboutYou from "./AboutYou";
import OtherExperience from "./OtherExperiences";

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
      <Referees
        referees={resumeData.referees}
        setReferees={(referees) => setResumeData({ ...resumeData, referees })}
      />
    </Container>
  );
}
