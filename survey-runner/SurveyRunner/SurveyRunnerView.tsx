import * as React from "react";
import "survey-core/defaultV2.min.css";
import { Model, SurveyModel } from "survey-core";
import { Survey } from "survey-react-ui";

export interface ISurveyRunnerViewProps {
  modelJSON: string;
  answers?: string;
  onComplete: (results: string) => void;
  onPartial: (results: string) => void;
}

export const SurveyRunnerView = (props: ISurveyRunnerViewProps) => {
  let model;
  try {
    model = JSON.parse(props.modelJSON);
  } catch (e) {
    return <div>Couldn&apos;t parse provided model JSON</div>;
  }

  const survey = new Model(model);

  try {
    const data = JSON.parse(props.answers || "");
    survey.data = data;
  } catch (e) {
    console.warn("No answers or invalid JSON format", e);
  }

  const completeHandler = (sender: SurveyModel) => {
    props.onComplete(JSON.stringify(sender.data));
  };
  const partialHandler = (sender: SurveyModel) => {
    props.onPartial(JSON.stringify(sender.data));
  };

  survey.onComplete.add(completeHandler);
  survey.onPartialSend.add(partialHandler);

  return <Survey model={survey} />;
};
