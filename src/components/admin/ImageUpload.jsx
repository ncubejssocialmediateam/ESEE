import { useState } from 'react';
import PropTypes from 'prop-types';
import { uploadFile } from '../../utils/s3-storage.js';

const ImageUpload = ({ onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to S3
    try {
      setIsUploading(true);
      const key = `articles/${Date.now()}-${file.name}`;
      await uploadFile(file, key, file.type);
      onImageUploaded(key);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
            ${isUploading ? 'bg-gray-100 border-gray-300' : 'border-gray-300 hover:border-indigo-500 hover:bg-gray-50'}`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      {isUploading && (
        <div className="text-center text-sm text-gray-500">
          Uploading image...
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  onImageUploaded: PropTypes.func.isRequired
};

export default ImageUpload;
