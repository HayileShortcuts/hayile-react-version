import type { ISection } from "@/types";
import { useStore } from "@nanostores/preact";
import {
  availableShortcuts,
  selectedEnvironment,
  selectedProgram,
} from "./Button";
import { useEffect, useState } from "preact/hooks";
import type { InferEntrySchema, RenderedContent } from "astro:content";
import { userSearchValue } from "./Searchbar";
import { Shortcut } from "./Shortcut";

interface ICollection {
  id: string;
  body?: string;
  collection: "shortcuts";
  data: InferEntrySchema<"shortcuts">;
  rendered?: RenderedContent;
  filePath?: string;
}

interface Props {
  sections: ICollection[];
  lang: "es" | "en";
}

export function Section({ sections: collections, lang }: Props) {
  const [sections, setSections] = useState<ISection[] | undefined>();
  const $environment = useStore(selectedEnvironment);
  const $program = useStore(selectedProgram);
  const $userSearchValue = useStore(userSearchValue);

  const matchesEnvironmentAndProgram = (
    prog: any,
    os: string,
    program: string
  ) =>
    prog.operativeSystem.toLowerCase() === os.toLowerCase() &&
    prog.environment.toLowerCase().includes(program.toLowerCase());

  function updateAvailableShortcuts(shortcuts: ICollection[]) {
    const available = {
      windows: true,
      mac: true,
      linux: true,
    };

    shortcuts.forEach((item) => {
      item.data.program.forEach((prog) => {
        const os = prog.operativeSystem.toLowerCase();
        if (prog.shortcuts?.length === 0) {
          available[os] = true;
        }
      });
    });

    availableShortcuts.set(available);
  }

  const filterByUserSearch = (sections: ISection[], search: string) => {
    const filteredSections = sections.map((section) => {
      const filteredValues = section.values.filter((value) => {
        return (
          value.command.toLowerCase().includes(search.toLowerCase()) ||
          value.description.toLowerCase().includes(search.toLowerCase())
        );
      });

      return {
        ...section,
        values: filteredValues,
      };
    });

    setSections(filteredSections);
  };
  const filterSections = (
    shortcuts: ICollection[],
    os: string,
    program: string
  ): ISection[] | undefined => {
    try {
      updateAvailableShortcuts(shortcuts);

      const filteredCollection = shortcuts.find((item) =>
        item.data.program.some((prog) =>
          matchesEnvironmentAndProgram(prog, os, program)
        )
      );

      if (filteredCollection) {
        const selected = filteredCollection.data.program.find((prog) =>
          matchesEnvironmentAndProgram(prog, os, $program)
        )?.shortcuts as ISection[];

        setSections(selected);
        return selected;
      }

      setSections(undefined);
      return undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  useEffect(() => {
    filterSections(collections, $environment, $program);
    const filteredSections = filterSections(
      collections,
      $environment,
      $program
    );
    if ($userSearchValue) {
      filterByUserSearch(filteredSections, $userSearchValue);
    }
  }, [$environment, $program, collections, $userSearchValue]);

  return (
    <div
      style={{
        height: "40rem",
      }}
      class={"grid-cols-1 overflow-x-scroll row-gap-4"}
      onClick={() => filterSections(collections, $environment, $program)}
    >
      {sections ? (
        sections.map(({ title, values }, i) => (
          <div key={i} class="grid-cols-1 row-gap-2 overscroll-none">
            {values.length > 0 && <h4 class="text-xl">{title}</h4>}
            {values.map((value) => (
              <Shortcut key={Math.random()} {...value} lang={lang} />
            ))}
          </div>
        ))
      ) : (
        <h4>No shortcuts found</h4>
      )}
    </div>
  );
}
