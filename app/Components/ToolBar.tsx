import { IconButton } from "./common/IconButton";
import { Icons } from "./common/Icons";

export function ToolBar({ onTodayClicked }: { onTodayClicked: () => void }) {
  return (
    <div className="flex flex-wrap px-2.5 border-b border-highlight_yellow ">
      <IconButton icon={Icons.today} text="Today" onClick={onTodayClicked} />

      <IconButton icon={Icons.edit} text="Edit" onClick={() => {}} />

      <div className="grow" />

      <IconButton icon={Icons.download} text="Download" onClick={() => {}} />
    </div>
  );
}
