"use client";

import * as Tabs from "@radix-ui/react-tabs";

export default function Sections({ sections, onSelect }) {
  return (
    <Tabs.Root
      defaultValue={sections?.[0]?.id?.toString()}
      onValueChange={(value) => onSelect(parseInt(value))}
      className="w-full my-4"
    >
      <Tabs.List className="flex flex-wrap gap-2 border-b border-gray-200">
        {sections?.map((section) => (
          <Tabs.Trigger
            key={section.id}
            value={section.id.toString()}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
          >
            {section.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
