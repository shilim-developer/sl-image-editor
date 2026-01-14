import { Canvas } from "fabric";

export class FabricEditor {
  canvas: Canvas;
  private plugins: Map<string, any> = new Map();
  //   private pluginMap: {
  //     [propName: string]: IPluginTempl;
  //   } = {};

  constructor(...args: ConstructorParameters<typeof Canvas>) {
    this.canvas = new Canvas(...args);
  }

  addPlugin(pluginName: string, plugin: any) {
    this.plugins.set(pluginName, plugin);
  }

  getPlugin(pluginName: string) {
    return this.plugins.get(pluginName);
  }
}
