import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { StepType, TourProvider } from "@reactour/tour";

import App from "./App.tsx";
import "./index.css";

const CURRENT_VERSION = "0.1.2";

// A simple update mechanism. When CURRENT_VERSION doesn't match
// what has been deployed, then reload to display latest app
fetch("version.txt")
  .then((response) => response.text())
  .then((version) => {
    console.log(version);
    if (version.trim() !== CURRENT_VERSION) {
      location.reload();
    }
  });

function TourContent({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <div style={{ padding: "30px 0", fontSize: "1.2em", textAlign: "center" }}>
      {children}
    </div>
  );
}

let reactourSteps: StepType[] = [
  {
    content: (
      <TourContent>
        <h2>Welcome!</h2>
        <p>This app allows you to create a CV/Resume based on your details</p>
      </TourContent>
    ),
    selector: "body",
    position: "center",
  },
  {
    content: (
      <TourContent>
        <p>Write as many of your details as you feel necessary</p>
      </TourContent>
    ),
    selector: ".personal-details-table",
    position: "center",
  },
  {
    content: (
      <TourContent>
        <p>
          You are not required to fill in every single detail, but only the ones
          you fill in will automatically be displayed on the CV
        </p>
      </TourContent>
    ),
    selector: ".personal-details-table",
    position: "center",
  },
  {
    content: (
      <TourContent>
        <p>
          When you finish filling in your details, you can preview how you want
          it to be displayed. You can also choose from multiple templates
        </p>
      </TourContent>
    ),
    selector: ".preview-button",
  },
  {
    content: (
      <TourContent>
        <p>
          Once you are satisfied, you can click on the print button to export a
          PDF
        </p>
      </TourContent>
    ),
    selector: ".print-button",
  },
  {
    content: (
      <TourContent>
        <p>
          The details you fill in will be saved locally so that you can continue
          with them later on
        </p>
      </TourContent>
    ),
    selector: "body",
  },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TourProvider steps={reactourSteps} disableInteraction>
      <App />
    </TourProvider>
  </React.StrictMode>
);
