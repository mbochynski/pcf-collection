import { create } from "domain";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IDropdownProps, ItemType } from "./HelloWorld";
import { v4 as uuidv4 } from "uuid";

export class MUIDropdown
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private container: HTMLDivElement;
  private reactRoot: Root;
  private notifyOutputChanged: () => void;
  private selectedValue: string | undefined;
  private uuid: string;

  /**
   * Empty constructor.
   */
  constructor() {
    this.uuid = uuidv4();
  }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    this.container = container;
    this.reactRoot = createRoot(this.container);
    this.notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const itemsRecords = context.parameters.Items;
    const items = itemsRecords.sortedRecordIds.map((id) => {
      const record = itemsRecords.records[id];

      return {
        key: record.getValue("itemValue"),
        text: record.getValue("itemValue"),
        itemType: record.getValue("itemType"),
      } as ItemType;
    });

    const props: IDropdownProps = {
      label: context.parameters.Label.raw ?? "",
      items,
      value: context.parameters.Value.raw ?? "",
      onChange: this.onChange.bind(this),
      uuid: this.uuid,
    };
    // Add code to update control view
    const element = React.createElement(HelloWorld, props);
    this.reactRoot.render(element);
  }

  public onChange(value: string | undefined) {
    this.selectedValue = value;
    this.notifyOutputChanged();
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      Value: this.selectedValue,
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
