import React, { useMemo, useState } from 'react';
import Page from '../custom/paper/Page';
import UserAppBar from './appBar/UserAppBar';
import { useDeleteRecipeMutation, useGetRecipesQuery } from '../../hooks/query/recipe/recipe';
import { IconButton, Typography } from '@mui/material';
import Loading from './Loading';
import DebouncedSearchInput from '../custom/textfield/DebouncedSearchInput';
import { IRecipe } from '../../models/recipe/recipe';
import { Add as AddIcon } from '@mui/icons-material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import RecipeEditDialog from '../recipe/dialog/RecipeEditDialog';
import { CustomMouseEvent } from '../../models/helper';
import lodash from 'lodash';
import { useAppSelector } from '../../hooks/redux/useAppSelector';

const PublicDashboard = () : JSX.Element => {

    const [searchText, setSearchText] = useState<string | null>(null);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

    const user = useAppSelector(x => x.auth.session?.user);

    const { data: recipes, isFetching: isLoadingRecipes } = useGetRecipesQuery();
    const [deleteRecipe, { status }] = useDeleteRecipeMutation();

    const filteredRecipes = useMemo(() => {
        if (!recipes) return [];

        let filteredResult = [...recipes];

        if (searchText) {
            filteredResult = filteredResult.filter((recipe : IRecipe) => {
                return (
                    recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    recipe.recipeDietaryTags?.some(x => x.dietaryTag?.name.toLowerCase().includes(searchText.toLowerCase()))
                );
            });
        }

        return filteredResult;
    }, [recipes, searchText]);

    const onAddRecipeClick = () : void => {
        setSelectedRecipe(null);
        setShowEdit(true);
    };

    const onEditRecipeClick = (e : CustomMouseEvent) : void => {
        const id = Number(e.currentTarget.value);
        const recipe = filteredRecipes.find(x => x.id === id);
        if (!recipe) return; // TODO: display error?

        setSelectedRecipe(recipe);
        setShowEdit(true);
    };

    const onDeleteRecipeClick = (e : CustomMouseEvent) : void => {
        const id = Number(e.currentTarget.value);
        const recipe = filteredRecipes.find(x => x.id === id);
        if (!recipe) return; // TODO: display error?

        deleteRecipe(recipe);
    };

    const handleClose = () : void => {
        setShowEdit(false);
    };

    return (
        <Page className='fdc aic hfill oya oxh'>
            <UserAppBar />
            <RecipeEditDialog
                open={showEdit}
                handleClose={handleClose}
                recipe={selectedRecipe}
            />
            {
                isLoadingRecipes ? <Loading /> :
                    <div className={'fdc w500'}>
                        <div className={'fdr flx1 wfill mt20 mb20'}>
                            <DebouncedSearchInput
                                searchText={searchText}
                                setSearchText={setSearchText}
                                autoFocus
                                fullWidth
                            />
                            {
                                user &&
                                <IconButton color='inherit' onClick={onAddRecipeClick}>
                                    <AddIcon color='inherit' />
                                </IconButton>
                            }
                        </div>
                        {
                            filteredRecipes.map(x => {
                                return (
                                    <div key={x.guid} className={'fdc'}>
                                        <div className={'fdr jcsb'}>
                                            <Typography variant={'bold'} fontSize={22}>{x.name}</Typography>
                                            {
                                                (x.createdById === user?.id) &&
                                                <div className='fdr'>
                                                    <IconButton size={'small'} color='inherit' value={x.id} onClick={onEditRecipeClick}>
                                                        <EditIcon fontSize={'small'} color='inherit' />
                                                    </IconButton>
                                                    <IconButton size={'small'} color='inherit' value={x.id} onClick={onDeleteRecipeClick}>
                                                        <DeleteIcon fontSize={'small'} color='inherit' />
                                                    </IconButton>
                                                </div>
                                            }
                                        </div>
                                        <div className={'fdr mb10'}>
                                            {
                                                x.recipeDietaryTags?.filter(y => !!y.isActive).map((y, index) => {
                                                    return (
                                                        <Typography
                                                            key={`${x.guid}-${y.dietaryTag?.guid}`}
                                                            variant={'italic'}
                                                            fontSize={14}>
                                                            {y.dietaryTag?.name}{index !== (x.recipeDietaryTags?.length ?? 0) - 1 ? ',' : ''}&nbsp;
                                                        </Typography>
                                                    );
                                                })
                                            }
                                        </div>
                                        <Typography variant={'bold'} fontSize={18}>Ingredients:</Typography>
                                        <ul className={'m0 mb10'}>
                                            {
                                                x.recipeIngredients?.filter(y => !!y.isActive).map(y => {
                                                    return (
                                                        <li key={`${x.guid}-${y.ingredient?.guid}`}>
                                                            <Typography>{`(${y.quantity}) ${y.ingredient?.name}`}</Typography>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                        <Typography variant={'bold'} fontSize={18}>Instructions:</Typography>
                                        <ol className={'m0 mb20'}>
                                            {
                                                lodash.chain(x.steps).filter(y => !!y.isActive).orderBy(y => y.index).map(y => {
                                                    return (
                                                        <li key={`${x.guid}-${y.guid}`}>
                                                            <Typography>{y.name}</Typography>
                                                        </li>
                                                    );
                                                }).value()
                                            }
                                        </ol>
                                    </div>
                                );
                            })
                        }
                    </div>
            }
        </Page>
    );
};

export default PublicDashboard;