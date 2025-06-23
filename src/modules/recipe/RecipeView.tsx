import React from 'react';
import Page from '../custom/paper/Page';
import { useGetRecipeQuery } from '../../hooks/query/recipe/recipe';
import { Box, CircularProgress, IconButton, styled, Typography } from '@mui/material';
import useParameter from '../../hooks/useParameter';
import lodash from 'lodash';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StyledPage = styled(Page)(() => ({

    padding: 0,

    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
      url('/assets/images/background.png')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const StyledBox = styled(Box)(() => ({
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
}));

const RecipeView = () : JSX.Element => {

    const recipeId = useParameter('id');

    const navigate = useNavigate();

    const { data: recipe, isFetching: isLoadingRecipe } = useGetRecipeQuery(Number(recipeId));

    const goBack = () : void => {
        navigate('/', {
            replace: true,
        });
    };

    return (
        <StyledPage className='fdc aic hfill oya oxh'>
            {
                isLoadingRecipe ?
                    <div className='wfill hfill fdc aic jcc'>
                        <CircularProgress color={'secondary'} />
                    </div> :
                    (
                        recipe &&
                        <StyledBox className={'fdc aic jcc hfill wfill'}>
                            <div className={'fdr aic jcc'}>
                                <IconButton onClick={goBack}>
                                    <ArrowBackIcon className={'cw'} fontSize={'large'}/>
                                </IconButton>
                                <Typography variant={'bold'} fontSize={22}>{recipe.name}</Typography>
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
                    )
            }
        </StyledPage>
    );
};

export default RecipeView;