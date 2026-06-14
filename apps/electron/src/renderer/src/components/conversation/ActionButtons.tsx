import { Button } from "@/components/ui/button";
import type { ActionButton } from "@/types/conversation";

interface ActionButtonsProps {
  buttons: ActionButton[];
  onAction: (action: string) => void;
  disabled?: boolean;
}

export function ActionButtons({ buttons, onAction, disabled }: ActionButtonsProps) {
  if (!buttons.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {buttons.map((button) => (
        <Button
          key={button.id}
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          disabled={disabled}
          onClick={() => onAction(button.action)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}
