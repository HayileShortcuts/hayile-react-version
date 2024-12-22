import type { JSX } from "preact/jsx-runtime";
import { atom } from "nanostores";
import { useStore } from "@nanostores/preact";

interface IButton {
  icon: JSX.Element;
  value: string;
  environment: TypeOfButton;
}

export enum TypeOfButton {
  ENVIRONMENT = "env",
  PROGRAM = "pgrm",
}

export const selectedEnvironment = atom<string>("mac");
export const selectedProgram = atom<string>("vscode");

export const availableShortcuts = atom<Record<string, boolean>>({
  windows: true,
  mac: true,
  linux: true,
});

export function Button({ icon, value, environment }: IButton) {
  const $available = useStore(availableShortcuts);
  const $selectedEnv = useStore(selectedEnvironment);
  const $selectedProg = useStore(selectedProgram);

  const isSelected =
    environment === TypeOfButton.ENVIRONMENT
      ? value === $selectedEnv
      : value === $selectedProg;

  function setValue() {
    if (environment === TypeOfButton.ENVIRONMENT) {
      selectedEnvironment.set(value);
    } else {
      selectedProgram.set(value);
    }
  }

  return (
    <button
      disabled={environment === TypeOfButton.ENVIRONMENT && !$available[value]}
      type="button"
      id={value}
      onClick={setValue}
      className={`${
        isSelected
          ? "flex p-3 h-12 max-w-40 bg-purple-500 rounded justify-around items-center shadow-md gap-3 transition ease-in-out delay-50 clic:-translate-y-2 scale-110  duration-300 hover:bg-purple-600"
          : "flex p-3 h-12 max-w-40 bg-gray-300/60 rounded justify-around items-center shadow-md gap-3 "
      }`}
    >
      {icon}
      <span
        className={`${
          isSelected ? "text-white font-semibold capitalize" : "capitalize"
        }`}
      >
        {value}
      </span>
    </button>
  );
}
