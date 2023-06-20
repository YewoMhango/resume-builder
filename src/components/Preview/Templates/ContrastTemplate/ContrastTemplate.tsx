import styles from "./ContrastTemplate.module.scss";
import {
  EducationalBackgroundItem,
  OtherExperienceItem,
  PersonalDetails,
  Referee,
  ResumeData,
  WorkExperienceItem,
} from "../../../../App";
import DateRangeDisplay from "../DateRangeDisplay";
import React from "react";
import { TemplateConfig } from "../../Preview";

export default function ContrastTemplate({
  resumeData,
  templateConfig,
}: {
  resumeData: ResumeData;
  templateConfig: TemplateConfig;
}) {
  return (
    <div
      className={styles.contrastTemplateContainer}
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
      <svg width="100%" height="100%" className={styles.backgroundSvg}>
        <rect x="0" y="0" width="3in" height="100%" fill="hsl(219, 21%, 90%)" />
      </svg>
      <LeftSection resumeData={resumeData} />
      <RightSection resumeData={resumeData} />
    </div>
  );
}

function LeftSection({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div className={styles.leftSection}>
      <ContactDetails personalDetails={resumeData.personalDetails} />
      <br />
      <Education educationalBackground={resumeData.educationalBackground} />
      <br />
      <Skills skills={resumeData.skills} />
      <br />
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
      <hr />
      {educationalBackground.map((education) => (
        <div key={JSON.stringify(education)}>
          <div>
            <DateRangeDisplay
              startDate={education.startDate}
              endDate={education.endDate}
            />
          </div>
          <h4>{education.program}</h4>
          <h5 style={{ marginBottom: "10px" }}>{education.school}</h5>
          <br />
        </div>
      ))}
    </>
  ) : (
    <></>
  );
}

function Skills({ skills }: { skills: string[] }) {
  return skills.length > 0 ? (
    <>
      <h3>Skills</h3>
      <hr />
      <ul className={styles.skillsList}>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
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
      <hr />
      {personalDetails.cellPhone ? (
        <>
          <h4>Phone</h4>
          <div>{personalDetails.cellPhone}</div>
          <br />
        </>
      ) : null}
      {personalDetails.email ? (
        <>
          <h4>Email</h4>
          <div>{personalDetails.email}</div>
          <br />
        </>
      ) : null}
    </>
  ) : (
    <></>
  );
}

function Languages({ languages }: { languages: string[] }) {
  return languages.length > 0 ? (
    <>
      <h3>Languages</h3>
      <hr />
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
      <Header
        personalDetails={resumeData.personalDetails}
        about={resumeData.about}
      />
      <br />
      <Experience workExperience={resumeData.workExperience} />
      <OtherExperiences otherExperiences={resumeData.otherExperiences} />
      <Referees referees={resumeData.referees} />
    </div>
  );
}

function Header({
  about,
  personalDetails,
}: {
  personalDetails: PersonalDetails;
  about: string;
}) {
  let { firstName, lastName, occupation } = personalDetails;

  return (
    <>
      <h1 className={styles.name}>
        {!firstName && !lastName ? (
          "[ Your Name ]"
        ) : (
          <>
            {firstName} {lastName}
          </>
        )}
      </h1>
      <h2 className={styles.occupation}>
        {occupation.trim() ? occupation : "[ your occupation ]"}
      </h2>
      <p>{about}</p>
    </>
  );
}

function Experience({
  workExperience,
}: {
  workExperience: WorkExperienceItem[];
}) {
  return workExperience.length > 0 ? (
    <>
      <h3>Work Experience</h3>
      <hr />
      <ul>
        <VerticalSideLine />
        {workExperience.map((work) => (
          <ListItem key={JSON.stringify(work)}>
            <div className={styles.dateRange}>
              <DateRangeDisplay
                startDate={work.startDate}
                endDate={work.endDate}
              />
            </div>
            <div className={styles.place}>{work.institution}</div>
            <div className={styles.work}>{work.position}</div>
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
      <hr />
      <ul>
        <VerticalSideLine />
        {otherExperiences.map((work) => (
          <ListItem key={JSON.stringify(work)}>
            <div className={styles.dateRange}>
              <DateRangeDisplay
                startDate={work.startDate}
                endDate={work.endDate}
              />
            </div>
            <div className={styles.place}>{work.place}</div>
            <div className={styles.work}>{work.work}</div>
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
      <hr />
      <div className={styles.refereesList}>
        {referees.map((referee) => (
          <div className={styles.referee} key={JSON.stringify(referee)}>
            <h4>{referee.name}</h4>
            <div>{referee.institution}</div>
            {referee.address ? (
              <div>
                <strong>Address:</strong> {referee.address}
              </div>
            ) : null}
            {referee.phone ? (
              <div>
                <strong>Phone:</strong> {referee.phone}
              </div>
            ) : null}
            {referee.email ? (
              <div>
                <strong>Email:</strong> {referee.email}
              </div>
            ) : null}
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
        <svg width="16px" height="20px">
          <ellipse
            cx={8}
            cy={12}
            rx={5}
            ry={5}
            fill="white"
            stroke="currentColor"
            strokeWidth={2}
          />
        </svg>
      </div>
      <div>{children}</div>
    </li>
  );
}
