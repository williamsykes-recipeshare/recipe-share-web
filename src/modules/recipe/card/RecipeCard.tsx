import React from 'react';
import { Box, CircularProgress, IconButton, styled, Typography } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import lodash from 'lodash';
import { useDeleteRecipeMutation } from '../../../hooks/query/recipe/recipe';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import { IRecipe } from '../../../models/recipe/recipe';
import useDisplaySuccessCallback from '../../../hooks/snackbar/useSuccessCallback';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)({
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '24px',
    margin: '10px 0',
    backdropFilter: 'blur(8px)',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    minHeight: '200px !important',
    height: '200px !important',
    maxHeight: '200px !important',
    overflow: 'hidden',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40px',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))',
        pointerEvents: 'none',
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
});

export interface IRecipeCardProps {
    recipe : IRecipe;

    onEditRecipeClick : (recipe : IRecipe) => void;
}

const RecipeCard = (props : IRecipeCardProps) : JSX.Element => {

    const navigate = useNavigate();

    const onDeleteSuccess = useDisplaySuccessCallback('Success');

    const { recipe } = { ...props };

    const user = useAppSelector(x => x.auth.session?.user);

    const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();

    const onEditRecipeClick = () : void => {
        props.onEditRecipeClick(recipe);
    };

    const onDeleteRecipeClick = async () : Promise<void> => {
        await deleteRecipe(recipe);

        onDeleteSuccess('Recipe deleted successfully');
    };

    const goToRecipe = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) : void => {
        const recipeId = Number(e.currentTarget.id);
        navigate(`/recipe/${recipeId}`);
    };

    return (

        <StyledBox className={'fdc'} id={`${recipe.id}`} onClick={goToRecipe}>
            <div className={'fdr jcsb'}>
                <Typography variant={'bold'} fontSize={22}>{recipe.name}</Typography>
                {
                    (recipe.createdById === user?.id) &&
                        <div className='fdr'>
                            {
                                isDeleting ?
                                    <CircularProgress color={'secondary'} /> :
                                    <>
                                        <IconButton size={'small'} color='inherit' value={recipe.id} onClick={onEditRecipeClick}>
                                            <EditIcon fontSize={'small'} color='inherit' />
                                        </IconButton>
                                        <IconButton size={'small'} color='inherit' value={recipe.id} onClick={onDeleteRecipeClick}>
                                            <DeleteIcon fontSize={'small'} color='inherit' />
                                        </IconButton>
                                    </>
                            }
                        </div>
                }
            </div>
            <div className={'fdr mb10'}>
                {
                    recipe.recipeDietaryTags?.filter(y => !!y.isActive).map((y, index) => {
                        return (
                            <Typography
                                key={`${recipe.guid}-${y.dietaryTag?.guid}`}
                                variant={'italic'}
                                fontSize={14}>
                                {y.dietaryTag?.name}{index !== (recipe.recipeDietaryTags?.length ?? 0) - 1 ? ',' : ''}&nbsp;
                            </Typography>
                        );
                    })
                }
            </div>
            <Typography variant={'bold'} fontSize={18}>Ingredients:</Typography>
            <ul className={'m0 mb10'}>
                {
                    recipe.recipeIngredients?.filter(y => !!y.isActive).map(y => {
                        return (
                            <li key={`${recipe.guid}-${y.ingredient?.guid}`}>
                                <Typography>{`(${y.quantity}) ${y.ingredient?.name}`}</Typography>
                            </li>
                        );
                    })
                }
            </ul>
            <Typography variant={'bold'} fontSize={18}>Instructions:</Typography>
            <ol className={'m0 mb20'}>
                {
                    lodash.chain(recipe.steps).filter(y => !!y.isActive).orderBy(y => y.index).map(y => {
                        return (
                            <li key={`${recipe.guid}-${y.guid}`}>
                                <Typography>{y.name}</Typography>
                            </li>
                        );
                    }).value()
                }
            </ol>
        </StyledBox>
    );
};

export default RecipeCard;