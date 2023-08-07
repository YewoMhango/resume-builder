import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useState } from "react";

import styles from "./Preview.module.scss";
import { ResumeData } from "../../App";
import BasicTemplate from "./Templates/BasicTemplate/BasicTemplate";
import ContrastTemplate from "./Templates/ContrastTemplate/ContrastTemplate";
import PerthTemplate from "./Templates/PerthTemplate/PerthTemplate";

enum Template {
  Basic = "Basic",
  Contrast = "Contrast",
  Perth = "Perth",
}

export type TemplateConfig = {
  fontSize: number;
};

export default function Preview({ resumeData }: { resumeData: ResumeData }) {
  let [resumeTemplate, setResumeTemplate] = useState<Template>(
    (localStorage.getItem("template") as Template | null) || Template.Basic
  );
  let [templateConfig, setTemplateConfig] = useState<TemplateConfig>(
    JSON.parse(localStorage.getItem("templateConfig") || "null") ||
    defaultTemplateConfiguration(resumeTemplate)
  );

  let updateTemplateConfig = (config: TemplateConfig) => {
    setTemplateConfig(config);
    localStorage.setItem("templateConfig", JSON.stringify(config));
  };

  let updateTemplate = (templateName: Template) => {
    setResumeTemplate(templateName);
    localStorage.setItem("template", templateName);
    updateTemplateConfig(defaultTemplateConfiguration(templateName));
  };

  return (
    <Container maxWidth="md" className={styles.previewContainer}>
      <Box className="hide-when-printing">
        <FormControl sx={{ width: "fit-content" }} size="small">
          <InputLabel id="template-label">Template</InputLabel>
          <Select
            labelId="template-label"
            label="Template"
            value={resumeTemplate}
            onChange={(e) => updateTemplate(e.target.value as Template)}
          >
            <MenuItem value={Template.Basic}>Basic</MenuItem>
            <MenuItem value={Template.Contrast}>Contrast</MenuItem>
            <MenuItem value={Template.Perth}>Perth</MenuItem>
          </Select>
        </FormControl>
        &nbsp;
        <FormControl sx={{ width: "100px" }} size="small">
          <InputLabel id="font-size-label">Font size</InputLabel>
          <Select
            labelId="font-size-label"
            label="Font size"
            value={templateConfig.fontSize}
            onChange={(e) =>
              updateTemplateConfig({
                ...templateConfig,
                fontSize: Number(e.target.value),
              })
            }
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br className="hide-when-printing" />
      <Box
        className={styles.previewPage}
        sx={{
          width: "fit-content",
          maxWidth: "100%",
          backgroundColor: "white",
        }}
      >
        {resumeTemplate === Template.Contrast ? (
          <ContrastTemplate
            resumeData={resumeData}
            templateConfig={templateConfig}
          />
        ) : resumeTemplate === Template.Perth ? (
          <PerthTemplate
            resumeData={resumeData}
            templateConfig={templateConfig}
          />
        ) : (
          <BasicTemplate
            resumeData={resumeData}
            templateConfig={templateConfig}
          />
        )}
      </Box>
    </Container>
  );
}

function defaultTemplateConfiguration(
  resumeTemplate: Template
): TemplateConfig {
  return { fontSize: resumeTemplate === Template.Basic ? 12 : 10 };
}
