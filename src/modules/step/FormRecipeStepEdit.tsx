import React from 'react';
import { Box, Button, IconButton, Paper } from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DroppableProvided,
    DraggableProvided,
    DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { IRecipeFormValue } from '../../models/recipe/recipe';
import FormTextField from '../custom/textField/FormTextField';

const FormRecipeSteps = () : JSX.Element => {
    const { control } = useFormContext<IRecipeFormValue>();

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'steps',
    });

    const onDragEnd = (result : DropResult) : void => {
        if (!result.destination) return;
        move(result.source.index, result.destination.index);
    };

    return (
        <Box>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='steps'>
                    {(droppableProvided : DroppableProvided) => (
                        <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                    {(draggableProvided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
                                        <Paper
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            sx={{
                                                p: 2,
                                                mb: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                            elevation={snapshot.isDragging ? 6 : 1}
                                        >
                                            <Box {...draggableProvided.dragHandleProps} sx={{ cursor: 'grab' }}>
                                                <DragIndicatorIcon />
                                            </Box>

                                            <FormTextField
                                                name={`steps.${index}.name`}
                                                label={`Step ${index + 1}`}
                                                fullWidth
                                            />

                                            <IconButton color='error' onClick={() => remove(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Paper>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <Button variant='contained' onClick={() => append({ name: '', index: fields.values.length })}>
                Add Step
            </Button>
        </Box>
    );
};

export default FormRecipeSteps;
