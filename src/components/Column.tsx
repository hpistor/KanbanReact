import * as React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ITask, IColumn } from "../initial-data";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  width: 220px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`;

interface IProps {
  column: IColumn;
  tasks: ITask[];
  index: number;
}

export default class Column extends React.Component<IProps> {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            <Droppable droppableId={this.props.column.id} type="TASK">
              {(provided, snapshot) => (
                <TaskList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
