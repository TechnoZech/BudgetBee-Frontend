"use client";

import Input from "../components/Input";
import CategorySelect from "../components/CategorySelect";
import { useState } from "react";
import { apiFetch } from "../config/api";
import DatePicker from "../components/DatePicker";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const AddTransaction = () => {
	const initialFormValue = {
		isCredit: false,
		title: "",
		category: "Category",
		amount: "",
		date: new Date(),
	};

	const [formData, setFormData] = useState(initialFormValue);

	const handleAddTransaction = async () => {
		try {
			if (
				!formData.title ||
				!formData.amount ||
				formData.category === "Category"
			) {
				toast.error("Please fill all the fields");
				return;
			}
			const response = await apiFetch("/transactions", {
				method: "POST",
				body: JSON.stringify(formData),
			});
			const data: { message: string; status?: number } = await response.json();
			if (response.status === 201) {
				toast.success(data.message);
				setFormData(initialFormValue);
			}
		} catch (error) {
			toast.error("Failed to add transactions");
			console.log(error);
		}
	};

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
					value={formData.category}
					onChange={(categoryId) =>
						setFormData({ ...formData, category: categoryId })
					}
				/>
				<DatePicker
					value={formData.date}
					onChange={(date) => setFormData({ ...formData, date })}
				/>
				<Link
					href="/home"
					onClick={handleAddTransaction}
					className="flex items-center justify-center gap-2 px-6 py-3  bg-zinc-700 hover:bg-zinc-900 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
				>
					<FaPlus className="text-sm" />
					Add Transaction
				</Link>
			</div>
		</div>
	);
};

export default AddTransaction;
