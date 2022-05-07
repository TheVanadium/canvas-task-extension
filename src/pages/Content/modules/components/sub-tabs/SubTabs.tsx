import React, { useState } from 'react';
import styled from 'styled-components';
import { TaskListState } from '../../types';

const SubtitleDiv = styled.div`
  border-bottom: 1px solid #c7cdd1;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
`;

interface SubtitleTabProps {
  active?: boolean;
}
const SubtitleTab = styled.div<SubtitleTabProps>`
  color: ${(p) =>
    p.active
      ? 'var(--ic-brand-font-color-dark)'
      : 'var(--ic-brand-font-color-dark-lightened-30)'};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
`;

export interface SubTabsProps {
  setTaskListState?: (state: TaskListState) => void;
  taskListState?: TaskListState;
}

/*
  Renders a subtitle within the app
*/
export default function SubTabs({
  setTaskListState,
  taskListState,
}: SubTabsProps): JSX.Element {
  const [dropdown, setDropdown] = useState(false);
  function toggleDropdown() {
    setDropdown(!dropdown);
  }
  function setTaskListUnfinished() {
    if (setTaskListState) setTaskListState('Unfinished');
  }
  function setTaskListCompleted() {
    if (setTaskListState) setTaskListState('Completed');
  }
  const unfinishedString = 'Unfinished';
  const finishedString = 'Completed';
  return (
    <SubtitleDiv onClick={toggleDropdown}>
      <SubtitleTab
        active={taskListState === 'Unfinished'}
        onClick={setTaskListUnfinished}
      >
        {unfinishedString}
      </SubtitleTab>
      <SubtitleTab
        active={taskListState === 'Completed'}
        onClick={setTaskListCompleted}
      >
        {finishedString}
      </SubtitleTab>
    </SubtitleDiv>
  );
}
