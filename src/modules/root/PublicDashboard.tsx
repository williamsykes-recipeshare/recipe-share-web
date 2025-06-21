import React, { useMemo, useState } from 'react';
import Page from '../custom/paper/Page';
import UserAppBar from './appBar/UserAppBar';
import { useGetRecipesQuery } from '../../hooks/query/recipe/recipe';
import { CircularProgress, IconButton, styled } from '@mui/material';
import DebouncedSearchInput from '../custom/textfield/DebouncedSearchInput';
import { IRecipe } from '../../models/recipe/recipe';
import { Add as AddIcon } from '@mui/icons-material';
import RecipeEditDialog from '../recipe/dialog/RecipeEditDialog';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import RecipeCard from '../recipe/card/RecipeCard';
import DietaryTagAutocomplete from '../custom/autocomplete/DietaryTagAutocomplete';
import { IDietaryTag } from '../../models/masterData/dietaryTag';

const StyledPage = styled(Page)(() => ({
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
      url('/assets/images/background.png')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const PublicDashboard = () : JSX.Element => {

    const [searchText, setSearchText] = useState<string | null>(null);
    const [selectedDietaryTagIds, setSelectedDietaryTagIds] = useState<Array<number>>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

    const user = useAppSelector(x => x.auth.session?.user);

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

        if (selectedDietaryTagIds.length > 0) {
            filteredResult = filteredResult.filter((recipe : IRecipe) => {
                return (
                    recipe.recipeDietaryTags?.some(x => selectedDietaryTagIds.some(y => y === x.dietaryTag?.id))
                );
            });
        }

        return filteredResult;
    }, [recipes, searchText, selectedDietaryTagIds]);

    const onDietaryTagChange = (value : Array<IDietaryTag>) : void => {
        setSelectedDietaryTagIds(value.map(x => x.id));
    };

    const onAddRecipeClick = () : void => {
        setSelectedRecipe(null);
        setShowEdit(true);
    };

    const onEditRecipeClick = (recipe : IRecipe) : void => {
        setSelectedRecipe(recipe);
        setShowEdit(true);
    };

    const handleClose = () : void => {
        setShowEdit(false);
    };

    return (
        <StyledPage className='fdc aic hfill oya oxh'>
            <UserAppBar />
            <RecipeEditDialog
                open={showEdit}
                handleClose={handleClose}
                recipe={selectedRecipe}
            />
            {
                isLoadingRecipes ? <CircularProgress color={'secondary'} /> :
                    <div className={'fdc w500 pb20'}>
                        <div className={'fdr aic jcc flx1 wfill mt20 mb20'}>
                            <DebouncedSearchInput
                                searchText={searchText}
                                setSearchText={setSearchText}
                                autoFocus
                                fullWidth
                            />
                            {
                                user &&
                                <IconButton size={'large'} color='inherit' onClick={onAddRecipeClick}>
                                    <AddIcon fontSize={'large'} color='inherit' />
                                </IconButton>
                            }
                        </div>
                        <DietaryTagAutocomplete
                            value={selectedDietaryTagIds}
                            onChange={onDietaryTagChange}
                        />
                        {
                            filteredRecipes.map(x => <RecipeCard key={x.guid} recipe={x} onEditRecipeClick={onEditRecipeClick} />)
                        }
                    </div>
            }
        </StyledPage>
    );
};

export default PublicDashboard;