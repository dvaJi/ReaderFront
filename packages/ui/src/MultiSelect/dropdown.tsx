import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { primaryColorRgba, background, toRgb } from '../theme';

import { useOutsideClick } from '../hooks/use-outside-click';

import Arrow from './arrow';
import Loading from './loading';
import { SelectPanelProps } from '../select-panel';

const inputBackgroundColor = theme('mode', {
  light: background.light.lightest,
  dark: background.dark.light
});

const inputBorderColor = theme('mode', {
  light: toRgb(background.light.darker),
  dark: toRgb(background.dark.lighter)
});

const inputColor = theme('mode', {
  light: background.light.darkest,
  dark: background.dark.lighter
});

const PanelContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  width: 100%;
  padding-top: 8px;

  .panel-content {
    max-height: 300px;
    overflow-y: auto;
    border-radius: 4px;
    background-color: ${inputBackgroundColor};
    boxshadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  outline: none;
  color: ${inputColor};
  background-color: ${inputBackgroundColor};
  border: 1px solid rgba(${inputBorderColor}, 0.4);
  border-radius: 4px;
  &:focus-within {
    box-shadow: 0 0 0 0.2rem rgba(${primaryColorRgba}, 0.25);
    border-color: rgba(${inputBorderColor}, 0.4);
  }
`;

const DropdownHeading = styled.div`
  position: relative;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
  height: 38px;
  cursor: default;
  outline: none;
  .dropdown-heading-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
`;

type Props = {
  children: React.ReactNode;
  contentComponent: (props: SelectPanelProps) => JSX.Element;
  contentProps: SelectPanelProps;
  isLoading?: boolean;
  disabled?: boolean;
  shouldToggleOnHover: boolean;
  labelledBy?: string;
  onMenuToggle?: (expanded: boolean) => void;
  ArrowRenderer?: (props: { expanded?: boolean }) => JSX.Element;
};

const Dropdown = ({
  children,
  contentComponent: ContentComponent,
  contentProps,
  isLoading,
  disabled,
  shouldToggleOnHover,
  labelledBy,
  onMenuToggle,
  ArrowRenderer
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const FinalArrow = ArrowRenderer || Arrow;

  const wrapper = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapper, () => setExpanded(false));

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onMenuToggle && onMenuToggle(expanded);
  }, [expanded]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.which) {
      case 27: // Escape
      case 38: // Up Arrow
        setExpanded(false);
        break;
      case 13: // Enter Key
      case 40: // Down Arrow
        setExpanded(true);
        break;
      default:
        return;
    }
    e.preventDefault();
  };
  const handleHover = (iexpanded: boolean) => {
    shouldToggleOnHover && setExpanded(iexpanded);
  };
  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    e.target === wrapper.current && !hasFocus && setHasFocus(true);
  };
  const handleBlur = () => hasFocus && setHasFocus(false);
  const handleMouseEnter = () => handleHover(true);
  const handleMouseLeave = () => handleHover(false);
  const toggleExpanded = () => setExpanded(isLoading ? false : !expanded);

  return (
    <DropdownContainer
      tabIndex={0}
      className="dropdown-container"
      aria-labelledby={labelledBy}
      aria-expanded={expanded}
      aria-readonly="true"
      aria-disabled={disabled}
      ref={wrapper}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownHeading className="dropdown-heading" onClick={toggleExpanded}>
        <div className="dropdown-heading-value">{children}</div>
        {isLoading && <Loading />}
        <FinalArrow expanded={expanded} />
      </DropdownHeading>
      {expanded && (
        <PanelContainer className="dropdown-content">
          <div className="panel-content">
            <ContentComponent {...contentProps} />
          </div>
        </PanelContainer>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
