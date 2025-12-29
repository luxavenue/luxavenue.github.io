import React, { useState } from 'react';
import jsPDF from 'jspdf';
import '../css/EstimateComponent.css';

const EstimateComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    serialNumber: '',
    notes: '',
    appraisalNumber: '',
  });

  const [uploadedImages, setUploadedImages] = useState<(string | null)[]>([null, null, null, null, null]);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newImages = [...uploadedImages];
      newImages[index] = url;
      setUploadedImages(newImages);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.setFontSize(16);
    doc.text('정품보증서', 220, 60);
    doc.setFontSize(12);
    doc.text(`상품명: ${formData.productName}`, 60, 120);
    doc.text(`시리얼: ${formData.serialNumber}`, 60, 150);
    doc.text(`특이사항: ${formData.notes}`, 60, 180);
    doc.text(`감정번호: ${formData.appraisalNumber}`, 60, 210);
    doc.text(`발행일자: ${today}`, 60, 240);

    uploadedImages.forEach((img, idx) => {
      if (img) {
        doc.addImage(img, 'JPEG', 60 + (idx % 3) * 170, 280 + Math.floor(idx / 3) * 100, 100, 100);
      }
    });

    doc.save('certificate.pdf');
  };

  return (
    <div className="estimate-wrapper">
      <form className="estimate-form">
        <input type="text" name="productName" placeholder="상품명" value={formData.productName} onChange={handleChange} />
        <input type="text" name="serialNumber" placeholder="시리얼" value={formData.serialNumber} onChange={handleChange} />
        <input type="text" name="notes" placeholder="특이사항" value={formData.notes} onChange={handleChange} />
        <input type="text" name="appraisalNumber" placeholder="감정번호" value={formData.appraisalNumber} onChange={handleChange} />
        {[...Array(5)].map((_, index) => (
          <div key={index} className="file-upload">
            <label htmlFor={`image-${index}`}>사진첨부 {index + 1}</label>
            <input type="file" id={`image-${index}`} accept="image/*" onChange={handleImageUpload(index)} />
          </div>
        ))}
      </form>

      <div className="preview">
        <div className="certificate">
          <h2>정품보증서</h2>
          <p>상품명: {formData.productName}</p>
          <p>시리얼: {formData.serialNumber}</p>
          <p>특이사항: {formData.notes}</p>
          <p>감정번호: {formData.appraisalNumber}</p>
          <p>발행일자: {today}</p>
          <div className="image-preview">
            {uploadedImages.map((img, idx) =>
              img ? <img key={idx} src={img} alt={`사진 ${idx + 1}`} className="certificate-image" /> : null
            )}
          </div>
        </div>
      </div>

      <button onClick={handleDownloadPDF} className="download-button">PDF 다운로드</button>
    </div>
  );
};

export default EstimateComponent;