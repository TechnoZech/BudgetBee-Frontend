"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../config/api";
import slugify from "slugify";
import toast from "react-hot-toast";
import DropDown from "./DropDown";

type Category = {
	_id: string;
	name: string;
	slug: string;
	type: boolean;
};

type Props = {
	isCredit: boolean;
	value: string;
	onChange: (categoryId: string) => void;
};

const CategorySelect = ({ isCredit, value, onChange }: Props) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [newCategory, setNewCategory] = useState("");

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await apiFetch(`/categories?type=${isCredit}`);
				const data = await res.json();
				setCategories(data.categories);
			} catch (err) {
				console.log(err);
				toast.error("Failed to load categories");
			}
		};
		fetchCategories();
	}, [isCredit]);

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

				const fetchCategories = async () => {
					try {
						const res = await apiFetch(`/categories?type=${isCredit}`);
						const data = await res.json();
						setCategories(data.categories);
					} catch (err) {
						console.log(err);
						toast.error("Failed to load categories");
					}
				};
				fetchCategories();

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
					...categories,
					{
						_id: "__new__",
						name: "Create New Category",
						slug: "",
						type: isCredit,
					},
				]}
				handleDropdownChange={onChange}
				title={
					value
						? categories.find((c) => c._id === value)?.name || "Select Category"
						: "Select Category"
				}
			/>

			{/* Create New Category */}
			{value === "__new__" && (
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
