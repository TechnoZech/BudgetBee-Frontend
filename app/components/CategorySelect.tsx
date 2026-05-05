"use client";

import { useState } from "react";
import { apiFetch } from "../config/api";
import slugify from "slugify";
import toast from "react-hot-toast";
import DropDown from "./DropDown";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { fetchCategories } from "../store/slices/categoriesSlice";

type Props = {
	isCredit: boolean;
	id: string;
	onChange: (categoryId: string) => void;

};

const CategorySelect = ({ isCredit, id, onChange }: Props) => {
	const [newCategory, setNewCategory] = useState("");
	const dispatch = useAppDispatch();
	const categories = useAppSelector((state) => state.categories.categories);
	let categoryOptions = Array.isArray(categories) ? categories : [];
	categoryOptions = categoryOptions.filter((category) => category.type === isCredit);

	const handleCreateCategory = async () => {
		if (!newCategory.trim()) {
			return;
		}

		try {
			const slug = slugify(newCategory, { lower: true, strict: true });

			const res = await apiFetch("/categories", {
				method: "POST",
				body: JSON.stringify({
					name: newCategory,
					slug,
					type: isCredit,
				}),
			});

			const data = await res.json();

			if (res.status === 201) {
				toast.success(data.message);
				setNewCategory("");

				await dispatch(fetchCategories());

				onChange(data.category._id);
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			console.log("err", err);
			toast.error("Failed to create category");
		}
	};

	return (
		<div className="w-full space-y-3">
			<DropDown
				options={[
					...categoryOptions,
					{
						_id: "__new__",
						name: "Create New Category"
					},
				]}
				handleDropdownChange={onChange}
				title={
					id
						? categoryOptions.find((c) => c._id === id)?.name || "Select Category"
						: "Select Category"
				}
			/>

			{/* Create New Category */}
			{id === "__new__" && (
				<div className="flex gap-2 mt-5">
					<input
						type="text"
						placeholder="New category name"
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
						className="flex-1 border border-zinc-700 bg-zinc-900 text-white rounded-lg px-4 py-3 
                   hover:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition"
					/>

					<button
						onClick={handleCreateCategory}
						className="px-4 py-2 rounded-lg border-3 bg-[#FFF799] hover:bg-yellow-500 
                   text-black font-medium transition"
					>
						ADD
					</button>
				</div>
			)}
		</div>
	);
};

export default CategorySelect;
