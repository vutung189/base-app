import { useRef } from "react";
import { OverlayTrigger, OverlayTriggerProps, Popover } from "react-bootstrap";
import { useTooltip } from "utils/hooks/useTooltipState";

interface Props {
  children: any;
  title: string;
  buttonContent: any;
  minWidth?: number;
  overLayTriggerProps?: Omit<OverlayTriggerProps, "children" | "overlay">;
}

const Tooltip = ({
  children,
  title,
  buttonContent,
  minWidth,
  overLayTriggerProps = {},
}: Props) => {

  const { isShow, handleOnMouseEnter, handleOnMouseLeave } = useTooltip();
  const ref = useRef(null);
  return (
    <>
      <OverlayTrigger
        trigger={["hover", "focus", "click"]}
        show={isShow}
        placement="left-end"
        container={ref}
        overlay={
          <Popover
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className="text-black"
            style={{ minWidth: minWidth }}
          >
            <Popover.Header as="h4">{title}</Popover.Header>
            <Popover.Body>{children}</Popover.Body>
          </Popover>
        }
        {...overLayTriggerProps}
      >
        <div
          ref={ref}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          {buttonContent}
        </div>
      </OverlayTrigger>
    </>
  );
};

export default Tooltip;
