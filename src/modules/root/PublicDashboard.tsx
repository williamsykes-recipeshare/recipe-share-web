import React, { useMemo, useState } from 'react';
import Page from '../custom/paper/Page';
import UserAppBar from './appBar/UserAppBar';
import { useGetRecipesQuery } from '../../hooks/query/recipe/recipe';
import { Typography } from '@mui/material';
import Loading from './Loading';
import DebouncedSearchInput from '../custom/textfield/DebouncedSearchInput';
import { IRecipe } from '../../models/recipe/recipe';

const PublicDashboard = () : JSX.Element => {

    const [searchText, setSearchText] = useState<string | null>(null);

    const { data: recipes, isFetching: isLoadingRecipes } = useGetRecipesQuery();

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

    return (
        <Page className='fdc aic hfill oya oxh'>
            <UserAppBar />
            {
                isLoadingRecipes ? <Loading /> :
                    <div className={'fdc w500'}>
                        <div className={'flx1 wfill mt20 mb20'}>
                            <DebouncedSearchInput
                                searchText={searchText}
                                setSearchText={setSearchText}
                                autoFocus
                            />
                        </div>
                        {
                            filteredRecipes.map(x => {
                                return (
                                    <div key={x.guid} className={'fdc'}>
                                        <Typography variant={'bold'} fontSize={22}>{x.name}</Typography>
                                        <div className={'fdr mb10'}>
                                            {
                                                x.recipeDietaryTags?.map((y, index) => {
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
                                                x.recipeIngredients?.map(y => {
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
                                                x.steps?.map(y => {
                                                    return (
                                                        <li key={`${x.guid}-${y.guid}`}>
                                                            <Typography>{y.name}</Typography>
                                                        </li>
                                                    );
                                                })
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