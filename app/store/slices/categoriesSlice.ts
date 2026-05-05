import { apiFetch } from "@/app/config/api";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

type FetchCategoriesResponse = {
    categories: Category[];
};

export const fetchCategories = createAsyncThunk<Category[], void, { state: { categories: CategoriesState } }>(
    "categories/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiFetch("/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = (await res.json()) as FetchCategoriesResponse | Category[];
            return Array.isArray(data) ? data : data.categories ?? [];
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
)

interface Category {
    _id: string;
    name: string;
    type: boolean;
    icon: string;
}

interface CategoriesState {
    categories: Category[];
    loading: boolean;
    fetched: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [] as Category[],
    loading: false,
    fetched: false,
	error: null,
}

const categoriesSlice = createSlice({
    name: "categories",
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    },
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            state.fetched = true;
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
    
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;