import { selectedProgram, selectedEnvironment } from "./Button";
import { useStore } from "@nanostores/preact";

export function SelectedTitle() {
  const $selectedEnv = useStore(selectedEnvironment);
  const $selectedProg = useStore(selectedProgram);

  return (
    <span class="flex flex-row text-2xl">
      <h3 class={"capitalize"}>
        {$selectedProg} - {$selectedEnv}
      </h3>
    </span>
  );
}
