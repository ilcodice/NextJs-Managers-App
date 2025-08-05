'use client';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFontSize, setLanguage } from '@/redux/settingsSlice';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import MDEditor from '@uiw/react-md-editor';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ChallengeForm() {
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.settings.fontSize);
  const language = useSelector((state) => state.settings.language);

  const { register, handleSubmit, setValue, watch } = useForm();

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [tests, setTests] = useState(['']);

  const onSubmit = async (data) => {
    try {
      const challengeId = "123"; // Replace with the real ID (from props, state, router, etc.)
  
      const res = await fetch(`http://localhost:5000/api/challenges/${challengeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) throw new Error("Failed to update challenge");
  
      const result = await res.json();
      console.log("Challenge updated:", result);
      alert("Challenge updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <label>Title *</label>
        <input {...register('title')} className="border p-2 rounded" required />

        <label>Category *</label>
        <input {...register('category')} className="border p-2 rounded" required />

        <label>Level *</label>
        <select {...register('level')} className="border p-2 rounded" required>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <label>Description *</label>
        <MDEditor value={description} onChange={setDescription} />
      </div>

      <div className="flex flex-col gap-4">
        <label>Function name *</label>
        <input {...register('functionName')} className="border p-2 rounded" required />

        <label>Code *</label>
        <CodeMirror
          value={code}
          height="200px"
          theme="light"
          extensions={[javascript()]}
          onChange={(value) => setCode(value)}
        />

        <div className="flex gap-4 items-center">
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            className="border p-1 rounded"
          >
            <option value="js">JavaScript</option>
            <option value="py">Python</option>
          </select>

          <label>Font size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => dispatch(setFontSize(Number(e.target.value)))}
            className="w-20 border p-1 rounded"
          />
        </div>

        <label>Tests *</label>
        {tests.map((test, i) => (
          <input
            key={i}
            value={test}
            onChange={(e) => {
              const copy = [...tests];
              copy[i] = e.target.value;
              setTests(copy);
            }}
            className="border p-2 rounded mb-1"
          />
        ))}
        <button
          type="button"
          onClick={() => setTests([...tests, ''])}
          className="bg-purple-500 text-white px-2 py-1 rounded w-fit"
        >
          +
        </button>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
        >
          Edit
        </button>
      </div>
    </form>
  );
}

