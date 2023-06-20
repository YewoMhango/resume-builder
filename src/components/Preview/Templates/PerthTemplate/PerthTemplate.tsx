import React from "react";
import { Call, Mail } from "@mui/icons-material";

import styles from "./PerthTemplate.module.scss";
import {
  EducationalBackgroundItem,
  OtherExperienceItem,
  PersonalDetails,
  Referee,
  ResumeData,
  WorkExperienceItem,
} from "../../../../App";
import DateRangeDisplay from "../DateRangeDisplay";
import { TemplateConfig } from "../../Preview";

export default function PerthTemplate({
  resumeData,
  templateConfig,
}: {
  resumeData: ResumeData;
  templateConfig: TemplateConfig;
}) {
  return (
    <div
      className={styles.perthTemplateContainer}
      style={{ fontSize: `${templateConfig.fontSize}pt` }}
    >
      <style>
        {`
          @page {
            margin: 0;
            height: 11.69in;
            width: 8.28in;
          }
        `}
      </style>
      <TopSection personalDetails={resumeData.personalDetails} />
      <div className={styles.bottomHalves}>
        <LeftSection resumeData={resumeData} />
        <RightSection resumeData={resumeData} />
      </div>
    </div>
  );
}

function TopSection({ personalDetails }: { personalDetails: PersonalDetails }) {
  let { firstName, lastName, occupation } = personalDetails;

  return (
    <div className={styles.topSection}>
      <svg height="0.5in" width={2} className={styles.topLine}>
        <rect width={2} height="0.5in" />
      </svg>
      {!firstName && !lastName ? (
        <h1 className={styles.lastName}>[ Your Name ]</h1>
      ) : (
        <>
          <h1 className={styles.firstName}>{firstName}</h1>{" "}
          <h1 className={styles.lastName}>{lastName}</h1>
        </>
      )}
      <h2 className={styles.occupation}>
        {occupation.trim() ? occupation : "[ your occupation ]"}
      </h2>
      <svg height="4em" width={2} className={styles.bottomLine}>
        <rect width={2} height="100%" />
      </svg>
    </div>
  );
}

function LeftSection({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div className={styles.leftSection}>
      <ContactDetails personalDetails={resumeData.personalDetails} />
      <Education educationalBackground={resumeData.educationalBackground} />
      <Skills skills={resumeData.skills} />
      <Languages languages={resumeData.languages} />
    </div>
  );
}

function Education({
  educationalBackground,
}: {
  educationalBackground: EducationalBackgroundItem[];
}) {
  return educationalBackground.length > 0 ? (
    <>
      <h3>Education</h3>
      <ul className={styles.linedList}>
        <VerticalSideLine />
        {educationalBackground.map((education) => (
          <ListItem key={JSON.stringify(education)}>
            <h4>{education.program}</h4>
            <div>{education.school}</div>
            <div>
              <DateRangeDisplay
                startDate={education.startDate}
                endDate={education.endDate}
              />
            </div>
          </ListItem>
        ))}
      </ul>
    </>
  ) : (
    <></>
  );
}

function Skills({ skills }: { skills: string[] }) {
  return skills.length > 0 ? (
    <>
      <h3>Skills</h3>
      <ul className={styles.skillsList} style={{ listStyleType: "none" }}>
        {skills.map((skill) => (
          <li key={skill}>
            <svg width={10} height={10}>
              <ellipse
                cx={5}
                cy={5}
                rx={3}
                ry={3}
                fill="none"
                stroke="var(--heading-color)"
                strokeWidth={2}
              />
            </svg>
            <div>{skill}</div>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <></>
  );
}

function ContactDetails({
  personalDetails,
}: {
  personalDetails: PersonalDetails;
}) {
  return personalDetails.cellPhone || personalDetails.email ? (
    <>
      <h3>Contact</h3>
      <p>
        {personalDetails.cellPhone ? (
          <div className={styles.phone}>
            <Call />
            &nbsp; {personalDetails.cellPhone}
          </div>
        ) : null}
        {personalDetails.email ? (
          <div className={styles.email}>
            <Mail />
            &nbsp; {personalDetails.email}
          </div>
        ) : null}
      </p>
      <br />
    </>
  ) : (
    <></>
  );
}

function Languages({ languages }: { languages: string[] }) {
  return languages.length > 0 ? (
    <>
      <h3>Languages</h3>
      <ul className={styles.languagesList}>
        {languages.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
    </>
  ) : (
    <></>
  );
}

function RightSection({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div className={styles.rightSection}>
      <About about={resumeData.about} />
      <Experience workExperience={resumeData.workExperience} />
      <OtherExperiences otherExperiences={resumeData.otherExperiences} />
      <Referees referees={resumeData.referees} />
    </div>
  );
}

function About({ about }: { about: string }) {
  return about ? (
    <>
      <h3>PROFILE</h3>
      <p>{about}</p>
      <br />
    </>
  ) : null;
}

function Experience({
  workExperience,
}: {
  workExperience: WorkExperienceItem[];
}) {
  return workExperience.length > 0 ? (
    <>
      <h3>Work Experience</h3>
      <ul className={styles.linedList}>
        <VerticalSideLine />
        {workExperience.map((work) => (
          <ListItem key={JSON.stringify(work)}>
            <h4 className={styles.mainText}>
              {work.position}
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <DateRangeDisplay
                startDate={work.startDate}
                endDate={work.endDate}
              />
            </h4>
            <div className={styles.subText}>{work.institution}</div>
          </ListItem>
        ))}
      </ul>
      <br />
    </>
  ) : (
    <></>
  );
}

function OtherExperiences({
  otherExperiences,
}: {
  otherExperiences: OtherExperienceItem[];
}) {
  return otherExperiences.length > 0 ? (
    <>
      <h3>Other Experiences</h3>
      <ul className={styles.linedList}>
        <VerticalSideLine />
        {otherExperiences.map((work) => (
          <ListItem key={JSON.stringify(work)}>
            <h4 className={styles.mainText}>
              {work.place}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <DateRangeDisplay
                startDate={work.startDate}
                endDate={work.endDate}
              />
            </h4>
            <div className={styles.subText}>{work.work}</div>
          </ListItem>
        ))}
      </ul>
      <br />
    </>
  ) : (
    <></>
  );
}

function VerticalSideLine() {
  return (
    <svg className={styles.leftLine}>
      <rect x={0} y={0} height="100%" width={2} fill="currentColor"></rect>
    </svg>
  );
}

function Referees({ referees }: { referees: Referee[] }) {
  return referees.length > 0 ? (
    <>
      <h3>Referees</h3>
      <div className={styles.refereesList}>
        {referees.map((referee) => (
          <div className={styles.referee} key={JSON.stringify(referee)}>
            <h4>{referee.name}</h4>
            <div>{referee.institution},</div>
            <div>{referee.address}</div>
            <div>{referee.phone} </div>
            <div> {referee.email}</div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <></>
  );
}

function ListItem({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <li>
      <div className={styles.listCircle}>
        <svg width="20px" height="24px">
          <ellipse
            cx={10}
            cy={12}
            rx={9}
            ry={9}
            fill="currentColor"
            stroke="white"
            strokeWidth={5}
          />
          <ellipse
            cx={10}
            cy={12}
            rx={3}
            ry={3}
            fill="currentColor"
            stroke="white"
            strokeWidth={2}
          />
        </svg>
      </div>
      <div>{children}</div>
    </li>
  );
}
