"use client";

import Button from "../components/Button";
import Input from "../components/Input";
import DropDown from "../components/DropDown";
import { useState } from "react";
import { apiFetch } from "../config/api";
import DatePicker from "../components/DatePicker";
import toast from "react-hot-toast";

const AddTransaction = () => {
	const initialFormValue = {
		isCredit: false,
		title: "",
		category: "Category",
		amount: "",
		date: new Date(),
	};

	const [formData, setFormData] = useState(initialFormValue);

	const debitOptions = [
		"Food",
		"Transport & Fuel",
		"Entertainment",
		"Bills",
		"Health & Medicine",
		"Shopping & Clothing",
		"Education & Learning",
		"Subscriptions",
		"Travel",
		"Gifts",
		"Donations",
		"Other",
	];
	const creditOptions = ["Salary", "Freelance", "Investment", "Gift", "Other"];

	const handleAddTransaction = async () => {
		try {
			if(!formData.title || !formData.amount || formData.category === "Category"){
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

	const handleDropdownChange = (value: string) => {
		setFormData({ ...formData, category: value });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black mt-10">
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
				{formData.isCredit ? (
					<DropDown
						options={creditOptions}
						handleDropdownChange={handleDropdownChange}
						title={formData.category}
					/>
				) : (
					<DropDown
						options={debitOptions}
						handleDropdownChange={handleDropdownChange}
						title={formData.category}
					/>
				)}
				<DatePicker
					value={formData.date}
					onChange={(date) => setFormData({ ...formData, date })}
				/>
				<Button text="Add Transaction" onClick={handleAddTransaction} />
			</div>
		</div>
	);
};

export default AddTransaction;
