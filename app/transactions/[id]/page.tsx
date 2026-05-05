"use client";

import Input from "../../components/Input";
import CategorySelect from "../../components/CategorySelect";
import { useState } from "react";
import { apiFetch } from "../../config/api";
import DatePicker from "../../components/DatePicker";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../hooks/useAppSelector";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useParams } from "next/navigation";
import { fetchTransactions } from "../../store/slices/transactionSlice";

const UpdateTransaction = () => {
	const params = useParams();
	const transactions = useAppSelector(
		(state) => state.transaction.transactions,
	);

	const transaction = transactions.find((t) => t._id === params.id);
	
	const router = useRouter();
	const dispatch = useAppDispatch();
	const initialFormValue = {
		_id: transaction?._id || "",
		isCredit: transaction?.type || false,
		title: transaction?.title || "",
		category: transaction?.category || {name: "Category"},
		amount: transaction?.amount?.toString() || "",
		date: transaction?.date ? new Date(transaction.date) : new Date(),
	};

	const [formData, setFormData] = useState(initialFormValue);

	const handleUpdateTransaction = async () => {
		try {
			if (
				!formData.title ||
				!formData.amount ||
				formData.category.name === "Category"
			) {
				toast.error("Please fill all the fields");
				return;
			}
			const response = await apiFetch("/transactions", {
				method: "PUT",
				body: JSON.stringify(formData),
			});
			const data: { message: string; status?: number } = await response.json();
			if (response.status === 200) {
				toast.success(data.message);
				setFormData(initialFormValue);
				dispatch(fetchTransactions());
				router.push("/home");
			}
		} catch (error) {
			toast.error("Failed to add transactions");
			console.log(error);
		}
	};

	const handleDeleteTransaction = async () => {
		try {
			const response = await apiFetch('/transactions', {
				method: "DELETE",
				body: JSON.stringify({ _id: formData._id }),
			})
			const data: { message: string; status?: number } = await response.json();
			if (response.status === 200) {
				toast.success(data.message);
				dispatch(fetchTransactions());
				router.push("/home");
			}
		} catch (error) {
			toast.error("Failed to delete transaction");
			console.log(error);
		}
	}

	return (
		<div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black mt-30 p-4">
			<div className="flex flex-col gap-5 items-center justify-center bg-zinc-800 p-10 rounded-xl lg:max-w-125 sm:w-full sm:m-10">
				<div className="flex gap-10 justify-start w-full">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="radio"
							name="Debit"
							value="Debit"
							checked={!formData.isCredit}
							onChange={() => setFormData({ ...formData, isCredit: false })}
						/>
						Debit
					</label>
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="radio"
							name="Credit"
							value="Credit"
							checked={formData.isCredit}
							onChange={() => setFormData({ ...formData, isCredit: true })}
						/>
						Credit
					</label>
				</div>
				<Input
					placeholder="Title"
					type="text"
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				></Input>
				<Input
					placeholder="Amount"
					type="number"
					value={formData.amount}
					onChange={(e) => {
						setFormData({ ...formData, amount: e.target.value });
					}}
				></Input>
				<CategorySelect
					isCredit={formData.isCredit}
					id={formData.category._id || ""}
					onChange={(categoryId) =>
						setFormData({ ...formData, category: { _id: categoryId } })
					}
				/>
				<DatePicker
					value={formData.date}
					onChange={(date) => setFormData({ ...formData, date })}
				/>
				<button
					onClick={handleUpdateTransaction}
					className="flex items-center justify-center gap-2 px-6 py-3  bg-zinc-700 hover:bg-zinc-900 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
				>
					Update Transaction
				</button>
				<button
					onClick={handleDeleteTransaction}
					className="flex items-center justify-center gap-2 px-6 py-3 bg-red-700/70 hover:bg-red-800 text-red-50 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
				>
					Delete Transaction
				</button>
			</div>
		</div>
	);
};

export default UpdateTransaction;
