import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/DocumentScanner.css';

interface DocumentScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: { title: string; description: string }) => void;
}

const DocumentScanner: React.FC<DocumentScannerProps> = ({ isOpen, onClose, onCreateTask }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      processImage(file);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);

    try {
      // In production, use Tesseract.js or cloud OCR service
      // For now, simulate OCR
      setTimeout(() => {
        const mockText = "Sample extracted text from receipt: \nBuy groceries\nCall dentist\nPay electricity bill";
        setExtractedText(mockText);
        setIsProcessing(false);
        toast.success('📄 Text extracted from image!');
      }, 2000);

      // Real implementation:
      // const { data: { text } } = await Tesseract.recognize(file, 'eng');
      // setExtractedText(text);
    } catch (error) {
      console.error('OCR error:', error);
      toast.error('Failed to extract text');
      setIsProcessing(false);
    }
  };

  const handleCreateFromText = () => {
    if (!extractedText.trim()) return;

    // Parse text into task
    onCreateTask({
      title: extractedText.split('\n')[0].substring(0, 100),
      description: extractedText
    });

    toast.success('✅ Task created from scanned document!');
    setSelectedImage(null);
    setExtractedText('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="scanner-overlay" onClick={onClose}>
          <motion.div
            className="scanner-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="scanner-header">
              <div>
                <h2>📸 Document Scanner</h2>
                <p>Scan receipts, notes, and documents</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="scanner-content">
              {!selectedImage ? (
                <div className="upload-section">
                  <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                    <span className="upload-icon">📸</span>
                    <h3>Scan or Upload Document</h3>
                    <p>Take a photo or select from gallery</p>
                    <button className="btn btn-primary">
                      📷 Choose Image
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="preview-section">
                  <div className="image-preview">
                    <img src={selectedImage} alt="Scanned document" />
                  </div>

                  {isProcessing ? (
                    <div className="processing-state">
                      <div className="spinner"></div>
                      <p>Extracting text from image...</p>
                    </div>
                  ) : extractedText ? (
                    <div className="extracted-section">
                      <h4>📄 Extracted Text</h4>
                      <textarea
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        rows={6}
                        className="extracted-text"
                      />
                      <div className="extract-actions">
                        <button
                          className="btn btn-ghost"
                          onClick={() => {
                            setSelectedImage(null);
                            setExtractedText('');
                          }}
                        >
                          ← Scan Another
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={handleCreateFromText}
                        >
                          ✅ Create Task
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              <div className="scanner-info">
                <p>💡 Tip: Take clear photos in good lighting for best results</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DocumentScanner;
