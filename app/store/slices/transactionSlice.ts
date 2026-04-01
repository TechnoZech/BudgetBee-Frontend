import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/app/config/api";

export interface Transaction {
	title: string;
	amount: number;
	date: string;
	category: string;
	type: boolean;
}

interface Filters {
	startDate?: string | null;
	endDate?: string | null;
	type?: "credit" | "debit" | null;
	category?: string | null;
}

interface TransactionState {
	transactions: Transaction[];
	loading: boolean;
    fetched: boolean;
	error: string | null;
	filters: Filters;
}

const initialState: TransactionState = {
	transactions: [],
	loading: false,
    fetched: false,
	error: null,
	filters: {
		startDate: null,
		endDate: null,
		type: null,
		category: null,
	},
};


export const fetchTransactions = createAsyncThunk<
	Transaction[],
	void,
	{ state: { transaction: TransactionState } }
>("transactions/fetch", async (_, { getState, rejectWithValue }) => {
	try {
		const { filters } = getState().transaction;

		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const params = new URLSearchParams({
			timezone: tz,
		});

		if (filters.startDate) params.append("startDate", filters.startDate);
		if (filters.endDate) params.append("endDate", filters.endDate);
		if (filters.type) params.append("type", filters.type);
		if (filters.category) params.append("category", filters.category);

		const res = await apiFetch(`/transactions?${params.toString()}`, {
			method: "GET",
		});

		if (!res.ok) throw new Error("Failed to fetch");

		return await res.json();
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("An unknown error occurred");
	}
});

const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		clearFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTransactions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.loading = false;
				state.transactions = action.payload;
                state.fetched = true;
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setFilters, clearFilters } = transactionSlice.actions;
export default transactionSlice.reducer;