import { Icon } from "./common/Icon";
import { IconButton } from "./common/IconButton";

export function ToolBar({ onTodayClicked }: { onTodayClicked: () => void }) {
  return (
    <div className="flex flex-wrap px-2.5 border-b border-highlight_yellow ">
      <IconButton
        icon={<Icon className="text-base" icon="today" />}
        text="Today"
        onClick={onTodayClicked}
      />

      <IconButton
        icon={<Icon className="text-base" icon="edit" />}
        text="Edit"
        onClick={() => {}}
      />

      <div className="grow" />

      <IconButton
        icon={<Icon className="text-base" icon="download" />}
        text="Download"
        onClick={() => {}}
      />
    </div>
  );
}
