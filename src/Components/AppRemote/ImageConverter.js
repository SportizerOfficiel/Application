import React, { useState } from 'react';

function ImageConverter() {
  const [base64Image, setBase64Image] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {base64Image && (
        <div>
          <h2>Your Base64 string is:</h2>
          <p>{base64Image}</p>
        </div>
      )}
    </div>
  );
}

export default ImageConverter;
