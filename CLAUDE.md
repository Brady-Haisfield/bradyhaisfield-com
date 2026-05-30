@AGENTS.md

## Workflow
For any big or multi-step task (new features, new components, refactors, or changes
spanning multiple files), plan first: briefly outline the approach and the files
involved before writing code, so it can be reviewed cheaply before execution.
Skip planning only for trivial one-line or single-file edits.

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA/review mode, flag any code that doesn't match DESIGN.md.
