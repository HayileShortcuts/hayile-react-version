export interface IShortcut {
  description: string;
  command: string;
  additionalCommand?: string;
}
export interface ISection {
  title: string;
  values: IShortcut[];
}
export interface IProgram {
  operativeSystem: string;
  environment: string;
  shortcuts: ISection[];
}
export interface IShortcutList {
  name: string;
  program: IProgram[];
}
