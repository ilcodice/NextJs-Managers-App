"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  level: z.string().min(1),
  description: z.string().min(1),
  functionName: z.string().min(1),
  code: z.string().min(1),
  tests: z.array(z.string().min(1)),
});

export default function ChallengeFormEdit() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Palindrome Checker",
      category: "Strings",
      level: "Easy",
      description:
        "### Problem Statement:\nWrite a function that checks whether a given string is a palindrome or not. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.",
      functionName: "palindrome",
      code: "",
      tests: [""],
    },
  });

  const [tests, setTests] = useState([""]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/challenges/edit", {
        method: "PUT", // or "POST" depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) throw new Error("Failed to update challenge");
  
      const result = await res.json();
      console.log("Challenge updated:", result);
      // Optionally redirect or show a message
    } catch (err) {
      console.error("Update error:", err);
    }
  };
  

  const handleAddTest = () => {
    const newTests = [...tests, ""];
    setTests(newTests);
    setValue("tests", newTests);
  };

  const handleTestChange = (index, value) => {
    const updated = [...tests];
    updated[index] = value;
    setTests(updated);
    setValue("tests", updated);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit challenge</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <input
              {...register("title")}
              className="mt-1 w-full border p-2 rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Category *</label>
            <input
              {...register("category")}
              className="mt-1 w-full border p-2 rounded"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Level *</label>
            <select
              {...register("level")}
              className="mt-1 w-full border p-2 rounded"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Description *</label>
            <MDEditor
              value={watch("description")}
              onChange={(value) => setValue("description", value || "")}
              height={200}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Function name *</label>
            <input
              {...register("functionName")}
              className="mt-1 w-full border p-2 rounded"
            />
            {errors.functionName && <p className="text-red-500 text-sm">{errors.functionName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Code *</label>
            <CodeMirror
              value={watch("code")}
              height="200px"
              theme="light"
              extensions={[javascript()]}
              onChange={(value) => setValue("code", value)}
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Tests *</label>
            {tests.map((test, index) => (
              <input
                key={index}
                value={test}
                onChange={(e) => handleTestChange(index, e.target.value)}
                className="mt-1 mb-2 w-full border p-2 rounded"
              />
            ))}
            <button
              type="button"
              onClick={handleAddTest}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              +
            </button>
            {errors.tests && <p className="text-red-500 text-sm">{errors.tests.message}</p>}
          </div>
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
