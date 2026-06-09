import { useState } from 'react';

export default function FileUpload({ label, name, register }) {
  const [preview, setPreview] = useState('');
  return (
    <div>
      <label className="mb-1 block font-medium" htmlFor={name}>{label}</label>
      <input
        id={name}
        type="file"
        accept="image/*"
        className="input"
        {...register(name)}
        onChange={(e) => setPreview(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : '')}
      />
      {preview && <img src={preview} alt="Selected file preview" className="mt-3 h-32 w-32 rounded-md object-cover" />}
    </div>
  );
}
