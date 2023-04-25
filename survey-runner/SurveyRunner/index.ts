import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { SurveyRunnerView, ISurveyRunnerViewProps } from "./SurveyRunnerView";
import * as React from "react";

export class SurveyRunner
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;
  private results: string = "";
  private status = "";

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    const model = context.parameters.modelJSON.raw || "";
    const data = context.parameters.results.raw || "";

    const props: ISurveyRunnerViewProps = {
      modelJSON: model,
      answers: data,
      onComplete: this.onSurveyComplete.bind(this),
      onPartial: this.onSurveyPartialSent.bind(this),
    };
    return React.createElement(SurveyRunnerView, props);
  }

  private saveResults(results: string) {
    this.results = results;
    this.notifyOutputChanged();
  }

  public onSurveyComplete(results: string) {
    this.status = "complete";
    this.saveResults(results);
  }

  public onSurveyPartialSent(results: string) {
    this.status = "partial";
    this.saveResults(results);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      results: this.results,
      resultType: this.status,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
