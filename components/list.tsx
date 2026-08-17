"use client";

import React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type DraggableAttributes,
} from "@dnd-kit/core";
import { useSortable, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type { DragEndEvent, DragStartEvent, DragOverEvent };

type DragHandleProps = DraggableAttributes;

interface ListProviderProps {
  children: React.ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  className?: string;
}

interface ListGroupProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

interface ListHeaderProps {
  name: string;
  color?: string;
  className?: string;
  dragHandleProps?: DragHandleProps;
  children?: React.ReactNode;
}

interface ListItemsProps {
  children: React.ReactNode;
  className?: string;
}

interface ListItemProps {
  id: string;
  index: number;
  name: string;
  parent: string;
  icon?: string;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function ListProvider({
  children,
  onDragEnd,
  className,
}: ListProviderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className={cn("flex w-full flex-col gap-4 p-4", className)}>
        {children}
      </div>
    </DndContext>
  );
}

/* -------------------------------------------------------------------------- */
/* Group                                                                      */
/* -------------------------------------------------------------------------- */

export function ListGroup({ id, children, className }: ListGroupProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "group",
    },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex w-full flex-col gap-2 overflow-hidden rounded-lg border border-border bg-white shadow-sm",
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<ListHeaderProps>(child) &&
          child.type === ListHeader
        ) {
          return React.cloneElement(child, {
            dragHandleProps: {
              ...attributes,
              ...listeners,
            },
          });
        }

        return child;
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

export function ListHeader({
  name,
  color,
  className,
  dragHandleProps,
  children,
}: ListHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border bg-gray-50/50 px-4 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div
          {...dragHandleProps}
          className="cursor-move rounded p-1 text-muted-foreground hover:bg-gray-200"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        {color && (
          <div
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor: color,
            }}
          />
        )}

        <span className="select-none text-base font-semibold capitalize text-foreground">
          {name}
        </span>
      </div>

      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Items Container                                                            */
/* -------------------------------------------------------------------------- */

export function ListItems({ children, className }: ListItemsProps) {
  return (
    <div className={cn("flex flex-col gap-0 bg-gray-50/30 p-2", className)}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Individual Item                                                            */
/* -------------------------------------------------------------------------- */

export function ListItem({ id, name, icon, className }: ListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "item",
    },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex items-center gap-3 border-b border-border bg-white p-3 transition-colors last:border-0 hover:bg-gray-50",
        className,
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move text-muted-foreground/40 hover:text-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {icon && <img src={icon} alt="" className="h-5 w-5 object-contain" />}

      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}
