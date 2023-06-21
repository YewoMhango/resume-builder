import { useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

let steps: Step[] = [
  {
    content: (
      <>
        <h2>Welcome to CV Builder</h2>
        <p>
          This app allows you to create a CV or resume based on your details
        </p>
      </>
    ),
    placement: "center",
    target: "body",
  },
  {
    content: (
      <>
        <p>Write as many of your details as you feel necessary</p>
      </>
    ),
    placement: "top-end",
    target: ".personal-details-table",
  },
  {
    content: (
      <>
        <p>
          You are not required to fill in every single detail, but only the ones
          you fill in will automatically be displayed on the CV
        </p>
      </>
    ),
    placement: "top-end",
    target: ".personal-details-table",
  },
  {
    content: (
      <>
        <p>
          When you finish filling in your details, you can preview how you want
          it to be displayed. You can also choose from multiple templates
        </p>
      </>
    ),
    placement: "left-end",
    target: ".preview-button",
  },
  {
    content: (
      <>
        <p>
          Once you are satisfied, you can click on the print button to export a
          PDF
        </p>
      </>
    ),
    target: ".print-button",
  },
  {
    content: (
      <>
        <p>
          The details you fill in will be saved locally so that you can continue
          with them later on
        </p>
      </>
    ),
    placement: "center",
    target: "body",
  },
];

export default function IntroDemo() {
  let [run, setRun] = useState(true);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#1976d2",
        },
      }}
    />
  );
}
