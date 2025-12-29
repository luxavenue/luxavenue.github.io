import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../css/EstimateImitationComponent.css';

const EstimateImitationComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    serialNumber: '',
    notes: '',
    appraisalNumber: '',
  });

  const [uploadedImages, setUploadedImages] = useState<(string | null)[]>([null, null, null, null, null]);
  const captureRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...uploadedImages];
      newImages[index] = URL.createObjectURL(file);
      setUploadedImages(newImages);
    }
  };

  const handleCapture = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, { scale: 2 });
      const image = canvas.toDataURL('image/jpeg');
      setImageUrl(image);
    }
  };

  const handleDownloadPDF = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg');

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
      pdf.save('certificate.pdf');
    }
  };

  return (
    <div className="imitation-write-wrapper">
      <form className="imitation-form">
        <div className='imitation-article'>
          <label>상품명 </label>
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
        </div>
        <div className='imitation-article'>
          <label>시리얼 </label>
          <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
        </div>
        <div className='imitation-article'>
          <label>특이사항 </label>
          <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
        </div>
        <div className='imitation-article'>
          <label>감정번호 </label>
          <input type="text" name="appraisalNumber" value={formData.appraisalNumber} onChange={handleChange} />
        </div>
        
        <div className="imitation-file-upload-group">
          {[...Array(5)].map((_, index) => (
            <div className="imitation-file-upload-wrapper" key={index}>
              <label htmlFor={`image-upload-${index}`} className={`imitation-file-label ${uploadedImages[index] ? 'uploaded' : ''}`}>
                사진 첨부 {index + 1}
              </label>
              <input
                id={`image-upload-${index}`}
                type="file"
                accept="image/*"
                onChange={handleImageUpload(index)}
                className="imitation-file-input"
              />
            </div>
          ))}
        </div>
      </form>

      <div className="imitation-output-capture" ref={captureRef}>
        <div className="imitation-a4-image">
          <img src="/img/estimate-watermark.png" className="estimate-watermark" alt="watermark" />

          <div className="text-group upper-text-group">
            <div className="text-row">
              <span className="text-label">상품명</span>
              <span className="text-value">{formData.productName}</span>
            </div>
            <div className="text-row">
              <span className="text-label">시리얼</span>
              <span className="text-value">{formData.serialNumber}</span>
            </div>
          </div>

          {uploadedImages.map((url, idx) =>
            url ? (
              <div key={idx} className={`image-frame image-${idx + 1}`}>
                <img src={url} alt={`첨부 이미지 ${idx + 1}`} className={`attached-image image-${idx + 1}`} />
              </div>
            ) : null
          )}
          
          <div className="text-group lower-text-group">
            <div className="text-row">
              <span className="text-label">특이사항</span>
              <span className="text-value">{formData.notes}</span>
            </div>
            <div className="text-row">
              <span className="text-label">감정번호</span>
              <span className="text-value">{formData.appraisalNumber}</span>
            </div>
            <div className="date-row">
              <span className="text-value">{today}</span>
            </div>
          </div>
        </div>
      </div>

      <button className="imitation-button" onClick={handleCapture}>위조품 확인서 생성</button>

      {imageUrl && (
        <div className="download-section">
          <a href={imageUrl} download="certificate.jpg" className="download-button">JPG 다운로드 →</a>
          <button onClick={handleDownloadPDF} className="download-pdf-button">PDF 다운로드 →</button>
        </div>
      )}
    </div>
  );
};

export default EstimateImitationComponent;
