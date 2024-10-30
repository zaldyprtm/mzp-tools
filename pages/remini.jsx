import axios from "axios";
import { useState } from "react";

export default function Remini() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    setResult(null);
    setProcessedImage(null);
  };

  const uploadFileToCloudinary = async () => {
    if (!file) {
      setError("Please select a file first");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mzppreset");

    try {
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dlb5lvglz/image/upload`,
        formData
      );
      
      const uploadedUrl = uploadResponse.data.secure_url;
      setFileUrl(uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("Failed to upload image. Please try again.");
    }
  };

  const sendUrlToApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setProcessedImage(null);

    try {
      const uploadedFileUrl = await uploadFileToCloudinary();
      if (!uploadedFileUrl) {
        throw new Error("Failed to upload image");
      }

      const response = await axios.post("/api/remini", { 
        url: uploadedFileUrl 
      });

      if (response.data.output_url) {
        setProcessedImage(response.data.output_url);
      }
      setResult(response.data);

    } catch (error) {
      console.error("Processing failed:", error);
      setError(
        error.response?.data?.message || 
        error.message || 
        "Failed to process image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="space-y-6">
        {/* File Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input 
            type="file" 
            onChange={handleFileChange}
            accept="image/*"
            className="w-full" 
          />
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: JPG, PNG. Max size: 5MB
          </p>
        </div>

        {/* Submit Button */}
        <button 
          onClick={sendUrlToApi} 
          disabled={!file || loading}
          className={`w-full py-3 px-4 rounded-lg font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {loading ? "Processing image..." : "Enhance Image"}
        </button>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Results Section */}
        {(fileUrl || processedImage) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fileUrl && (
              <div className="space-y-2">
                <h3 className="font-medium">Original Image</h3>
                <img 
                  src={fileUrl} 
                  alt="Original" 
                  className="w-full rounded-lg shadow-sm"
                />
              </div>
            )}
            {processedImage && (
              <div className="space-y-2">
                <h3 className="font-medium">Enhanced Image</h3>
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="w-full rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>
        )}

        {/* API Response Details */}
        {result && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Processing Details:</h3>
            <pre className="bg-white p-2 rounded overflow-x-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}