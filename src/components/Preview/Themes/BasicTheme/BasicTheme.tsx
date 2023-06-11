import { DateTime } from "luxon";
import nationalities from "i18n-nationality";
import EnLocale from "i18n-nationality/langs/en.json";

import {
  EducationalBackgroundItem,
  PersonalDetails,
  ResumeData,
  Referee,
  WorkExperienceItem,
} from "../../../../App";
import styles from "./BasicTheme.module.scss";

nationalities.registerLocale(EnLocale);

export default function BasicTheme({ resumeData }: { resumeData: ResumeData }) {
  const { personalDetails } = resumeData;

  return (
    <div className={styles.basicThemeContainer}>
      <h1>
        {personalDetails.firstName} {personalDetails.lastName}{" "}
        {(personalDetails.lastName || personalDetails.firstName) &&
        personalDetails.occupation
          ? "–"
          : null}{" "}
        {personalDetails.occupation}
      </h1>
      <PersonalDetailsSection personalDetails={personalDetails} />
      {resumeData.about ? <AboutSection about={resumeData.about} /> : null}
      {resumeData.educationalBackground.length > 0 ? (
        <EducationalBackgroundSection
          educationalBackground={resumeData.educationalBackground}
        />
      ) : null}
      {resumeData.workExperience.length > 0 ? (
        <WorkExperienceSection workExperience={resumeData.workExperience} />
      ) : null}{" "}
      {resumeData.skills.length > 0 ? (
        <SkillsSection skills={resumeData.skills} />
      ) : null}
      {resumeData.referees.length > 0 ? (
        <RefereesSection referees={resumeData.referees} />
      ) : null}
    </div>
  );
}

function PersonalDetailsSection({
  personalDetails,
}: {
  personalDetails: PersonalDetails;
}) {
  return (
    <>
      <h2>PERSONAL DETAILS</h2>
      <section className={styles.personalDetails}>
        {personalDetails.firstName ? (
          <div>
            <strong>First name:</strong> {personalDetails.firstName}
          </div>
        ) : null}
        {personalDetails.lastName ? (
          <div>
            <strong>Surname:</strong> {personalDetails.lastName}
          </div>
        ) : null}
        {personalDetails.gender ? (
          <div>
            <strong>Gender:</strong> {personalDetails.gender}
          </div>
        ) : null}
        {personalDetails.birthDate ? (
          <div>
            <strong>Birth date:</strong>{" "}
            {personalDetails.birthDate.toLocaleString(DateTime.DATE_FULL)}
          </div>
        ) : null}
        {personalDetails.maritalStatus ? (
          <div>
            <strong>Marital status:</strong> {personalDetails.maritalStatus}
          </div>
        ) : null}
        {personalDetails.nationality ? (
          <div>
            <strong>Nationality:</strong>{" "}
            {nationalities.getName(personalDetails.nationality, "en")}
          </div>
        ) : null}
        {personalDetails.cellPhone ? (
          <div>
            <strong>Phone number:</strong> {personalDetails.cellPhone}
          </div>
        ) : null}
        {personalDetails.email ? (
          <div>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${personalDetails.email}`}>
              {personalDetails.email}
            </a>
          </div>
        ) : null}
      </section>
    </>
  );
}

function AboutSection({ about }: { about: string }) {
  return (
    <>
      <h2>ABOUT ME</h2>
      <section>{about}</section>
    </>
  );
}

function EducationalBackgroundSection({
  educationalBackground,
}: {
  educationalBackground: EducationalBackgroundItem[];
}) {
  return (
    <>
      <h2>EDUCATIONAL BACKGROUND</h2>
      <section>
        <ol>
          <table className={styles.educationalBackgroundTable}>
            {educationalBackground.map((element) => (
              <li key={JSON.stringify(element)}>
                <tr>
                  <td colSpan={2}>
                    <h3>{element.program}</h3>
                  </td>
                </tr>
                <tr>
                  <td>School:</td>
                  <td>{element.school}</td>
                </tr>
                <tr>
                  <td>Years</td>
                  <td>
                    <DateRangeDisplay
                      startDate={element.startDate}
                      endDate={element.endDate}
                    />
                  </td>
                </tr>
              </li>
            ))}
          </table>
        </ol>
      </section>
    </>
  );
}

function WorkExperienceSection({
  workExperience,
}: {
  workExperience: WorkExperienceItem[];
}) {
  return (
    <>
      <h2>WORK EXPERIENCE</h2>
      <section>
        <ol>
          <table className={styles.workExperienceTable}>
            {workExperience.map((element) => (
              <li key={JSON.stringify(element)}>
                <tr>
                  <td colSpan={2}>
                    <h3>{element.institution}</h3>
                  </td>
                </tr>
                <tr>
                  <td>Position:</td>
                  <td>{element.position}</td>
                </tr>
                <tr>
                  <td>Years:</td>
                  <td>
                    <DateRangeDisplay
                      startDate={element.startDate}
                      endDate={element.endDate}
                    />
                  </td>
                </tr>
              </li>
            ))}
          </table>
        </ol>
      </section>
    </>
  );
}

function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <>
      <h2>SKILLS</h2>
      <section>
        <ul className={styles.skillsList}>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

function RefereesSection({ referees }: { referees: Referee[] }) {
  return (
    <>
      <h2>REFEREES</h2>
      <section>
        <ol>
          <table className={styles.refereesTable}>
            {referees.map((element) => (
              <li key={JSON.stringify(element)}>
                <tr>
                  <td>
                    <h3>{element.name}</h3>
                  </td>
                </tr>
                <tr>
                  <td>{element.institution}</td>
                </tr>
                <tr>
                  <td>{element.address}</td>
                </tr>
                {element.phone ? (
                  <tr>
                    <td>Phone: {element.phone}</td>
                  </tr>
                ) : null}
                {element.email ? (
                  <tr>
                    <td>
                      Email:{" "}
                      <a href={`mailto:${element.email}`}>{element.email}</a>
                    </td>
                  </tr>
                ) : null}
              </li>
            ))}
          </table>
        </ol>
      </section>
    </>
  );
}

function DateRangeDisplay(props: {
  startDate: DateTime | null;
  endDate: DateTime | null;
}) {
  return (
    <>
      {props.startDate?.year}{" "}
      {props.endDate !== null &&
      props.endDate.year === props.startDate?.year ? null : (
        <>
          {props.startDate !== null ? "–" : null}
          {props.endDate === null ? "Present" : props.endDate.year}
        </>
      )}
    </>
  );
}

// function allFieldsAreEmpty(obj: { [key: string]: any }) {
//   for (let key of Object.keys(obj)) {
//     if (obj[key]) {
//       return false;
//     }
//   }
//   return true;
// }
