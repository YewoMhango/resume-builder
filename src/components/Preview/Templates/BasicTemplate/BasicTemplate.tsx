import { DateTime } from "luxon";
import nationalities from "i18n-nationality";
import EnLocale from "i18n-nationality/langs/en.json";

import {
  EducationalBackgroundItem,
  PersonalDetails,
  ResumeData,
  Referee,
  WorkExperienceItem,
  OtherExperienceItem,
} from "../../../../App";
import styles from "./BasicTemplate.module.scss";
import DateRangeDisplay from "../DateRangeDisplay";
import { TemplateConfig } from "../../Preview";

nationalities.registerLocale(EnLocale);

export default function BasicTemplate({
  resumeData,
  templateConfig,
}: {
  resumeData: ResumeData;
  templateConfig: TemplateConfig;
}) {
  const { personalDetails } = resumeData;

  return (
    <div
      className={styles.basicTemplateContainer}
      style={{ fontSize: `${templateConfig.fontSize}pt` }}
    >
      <h1>
        {personalDetails.firstName} {personalDetails.lastName}&nbsp;
        {(personalDetails.lastName || personalDetails.firstName) &&
        personalDetails.occupation
          ? "–"
          : null}
        &nbsp;
        {personalDetails.occupation}
      </h1>
      <PersonalDetailsSection
        personalDetails={personalDetails}
        languages={resumeData.languages}
      />
      {resumeData.about ? <AboutSection about={resumeData.about} /> : null}
      {resumeData.educationalBackground.length > 0 ? (
        <EducationalBackgroundSection
          educationalBackground={resumeData.educationalBackground}
        />
      ) : null}
      {resumeData.workExperience.length > 0 ? (
        <WorkExperienceSection workExperience={resumeData.workExperience} />
      ) : null}
      {resumeData.otherExperiences.length > 0 ? (
        <OtherExperienceSection otherExperience={resumeData.otherExperiences} />
      ) : null}
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
  languages,
}: {
  personalDetails: PersonalDetails;
  languages: string[];
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
            <strong>Birth date:</strong>
            &nbsp;
            {personalDetails.birthDate.toLocaleString(DateTime.DATE_FULL)}
          </div>
        ) : null}
        {languages.length > 0 ? (
          <div>
            <strong>Languages:</strong> {listOfItemsToEnglish(languages)}
          </div>
        ) : null}
        {personalDetails.maritalStatus ? (
          <div>
            <strong>Marital status:</strong> {personalDetails.maritalStatus}
          </div>
        ) : null}
        {personalDetails.nationality ? (
          <div>
            <strong>Nationality:</strong>
            &nbsp;
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
            <strong>Email:</strong>
            &nbsp;
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
                {element.school ? (
                  <tr>
                    <td>School:</td>
                    <td>{element.school}</td>
                  </tr>
                ) : null}
                {element.startDate || element.endDate ? (
                  <tr>
                    <td>Years:</td>
                    <td>
                      <DateRangeDisplay
                        startDate={element.startDate}
                        endDate={element.endDate}
                      />
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
                {element.position ? (
                  <tr>
                    <td>Position:</td>
                    <td>{element.position}</td>
                  </tr>
                ) : null}
                {element.startDate || element.endDate ? (
                  <tr>
                    <td>Years:</td>
                    <td>
                      <DateRangeDisplay
                        startDate={element.startDate}
                        endDate={element.endDate}
                      />
                    </td>
                  </tr>
                ) : null}
                {element.duties ? (
                  <tr>
                    <td>Duties:</td>
                    <td>
                      <ul style={{ paddingLeft: "15px" }}>
                        {element.duties.map((value) => (
                          <li style={{ paddingBottom: "0" }}>{value}</li>
                        ))}
                      </ul>
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

function OtherExperienceSection({
  otherExperience,
}: {
  otherExperience: OtherExperienceItem[];
}) {
  return (
    <>
      <h2>OTHER EXPERIENCES</h2>
      <section>
        <ol>
          <table className={styles.otherExperienceTable}>
            {otherExperience.map((element) => (
              <li key={JSON.stringify(element)}>
                <tr>
                  <td colSpan={2}>
                    <h3>{element.place}</h3>
                  </td>
                </tr>
                {element.work ? (
                  <tr>
                    <td>Work:</td>
                    <td>{element.work}</td>
                  </tr>
                ) : null}
                {element.startDate || element.endDate ? (
                  <tr>
                    <td>Time:</td>
                    <td>
                      <DateRangeDisplay
                        startDate={element.startDate}
                        endDate={element.endDate}
                      />
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
                      Email: &nbsp;
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

function listOfItemsToEnglish(list: string[]) {
  if (list.length === 0) {
    return "";
  }

  if (list.length === 1) {
    list[0];
  }

  return list.reduce(
    (prev, curr, index) =>
      `${prev}${index === list.length - 1 ? " and" : ","} ${curr}`
  );
}
