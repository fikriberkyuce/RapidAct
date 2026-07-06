"use client";

import type { Workflow } from "../shared/types";
import { WorkflowPickerModal } from "../workflows/WorkflowPickerModal";

interface Props {
    open: boolean;
    onClose: () => void;
    onSelect: (workflow: Workflow) => Promise<void> | void;
    projectName?: string;
    projectCmNumber?: string | null;
    initialWorkflowId?: string;
}

export function AssistantWorkflowModal({
    open,
    onClose,
    onSelect,
    projectName,
    projectCmNumber,
    initialWorkflowId,
}: Props) {
    const breadcrumbs = projectName
        ? [
              "Projeler",
              `${projectName}${projectCmNumber ? ` (#${projectCmNumber})` : ""}`,
              "Asistan",
              "İş akışı ekle",
          ]
        : ["Asistan", "İş akışı ekle"];

    return (
        <WorkflowPickerModal
            open={open}
            onClose={onClose}
            onSelect={onSelect}
            workflowType="assistant"
            breadcrumbs={breadcrumbs}
            primaryLabel="Use"
            initialWorkflowId={initialWorkflowId}
        />
    );
}
