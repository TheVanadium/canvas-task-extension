import React from 'react';
import styled from 'styled-components';
import { AssignmentType } from '../../types';
import { ASSIGNMENT_ICON } from '../../constants';
import { CheckIcon } from '../../icons';

const TaskContainer = styled.div`
    width: 100%;
    height: 65px;
    margin: 5px;
    background-color: inherit;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    &:hover {
      box-shadow: 0 4px 7px rgba(0, 0, 0, 0.3);
    }
    @keyframes canvas-tasks-skeleton-pulse {
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  `,
  TaskInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 6px 8px 6px;
    box-sizing: border-box;
    width: 100%;
    font-size: 11px;
    color: var(--ic-brand-font-color-dark-lightened-15);
    overflow-x: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  TaskLink = styled.a`
    color: var(--ic-brand-font-color-dark);
    font-weight: 700;
    font-size: 15px;
    &:hover {
      color: var(--ic-brand-font-color-dark);
    }
    overflow-x: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  TaskLeft = styled.div`
    width: 40px;
    height: 100%;
    border-radius: 4px 0px 0px 4px;
    background-color: ${(props) => props.color};
    padding: 6px;
    padding-bottom: 8px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  `,
  CourseCodeText = styled.div`
    color: ${(props) => props.color};
    font-weight: 700;
    margin-top: 4px;
    overflow-x: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  `,
  TaskTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  TaskDetailsText = styled.div`
    overflow-x: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  SkeletonTitle = styled.div`
    width: 90%;
    height: 12px;
    background-color: #e8e8e8;
    margin: 3px 0px;
    animation: canvas-tasks-skeleton-pulse 1s infinite;
  `,
  SkeletonInfo = styled.div`
    width: 75%;
    height: 12px;
    background-color: #e8e8e8;
    margin: 2px 0px;
    animation: canvas-tasks-skeleton-pulse 1s 0.5s infinite linear both;
  `,
  SkeletonCourseCode = styled.div`
    width: 50%;
    height: 12px;
    background-color: #e8e8e8;
    margin: 2px 0px;
    animation: canvas-tasks-skeleton-pulse 1s 0.5s infinite linear both;
  `;
interface TaskProps {
  name: string;
  type: AssignmentType;
  html_url: string;
  due_at: string;
  points_possible?: number;
  complete: boolean;
  submitted?: boolean;
  score?: number;
  color: string;
  graded?: boolean;
  markComplete?: () => void;
  skeleton?: boolean;
}
/*
    Renders an individual task item
*/

export default function Task({
  name,
  type,
  html_url,
  due_at,
  points_possible,
  complete,
  graded,
  score,
  color,
  submitted,
  markComplete,
  skeleton,
}: TaskProps): JSX.Element {
  const due_at_date = new Date(due_at);
  const due_date = due_at_date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const due_time = due_at_date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  function onClick(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    window.location.href = html_url;
  }
  const icon = ASSIGNMENT_ICON[type];

  const due = 'Due';
  const unsubmittedText = !submitted && complete ? 'Unsubmitted' : '';
  const dueText = ` ${due_date} at ${due_time}`;
  const pointsPlural = !points_possible
    ? ''
    : points_possible > 1
    ? 'points'
    : 'point';
  const pointsText = points_possible
    ? ` \xa0|\xa0 ${points_possible} ${pointsPlural}`
    : '';
  const gradedText = points_possible
    ? ` ${!graded ? '–' : score}/${points_possible}`
    : 'Completed';
  function markAssignmentAsComplete() {
    if (markComplete) markComplete();
  }
  return (
    <TaskContainer>
      <TaskLeft
        color={(!skeleton ? color : '#e8e8e8') || '000000'}
        onClick={onClick}
      >
        {!skeleton ? icon : ''}
      </TaskLeft>
      <TaskInfo>
        <TaskTop>
          <CourseCodeText color={color}>
            {!skeleton ? name : <SkeletonCourseCode />}
          </CourseCodeText>
          {!skeleton && !complete ? (
            <CheckIcon
              checkStyle={complete ? 'Revert' : 'Check'}
              onClick={markAssignmentAsComplete}
            />
          ) : (
            ''
          )}
        </TaskTop>
        <TaskLink href={html_url}>
          {!skeleton ? name : <SkeletonTitle />}
        </TaskLink>
        <TaskDetailsText>
          {skeleton ? (
            <SkeletonInfo />
          ) : !complete ? (
            <>
              <strong>{due}</strong>
              {dueText + pointsText}
            </>
          ) : (
            <>
              <strong>{unsubmittedText}</strong>
              <strong>{gradedText}</strong> {pointsPlural}
            </>
          )}
        </TaskDetailsText>
      </TaskInfo>
    </TaskContainer>
  );
}

TaskLink.displayName = 'TaskLink';
