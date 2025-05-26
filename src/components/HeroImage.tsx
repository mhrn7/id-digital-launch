
import { useState, useEffect } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

const HeroImage = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        setIsProcessing(true);
        console.log('Starting image processing...');
        
        // Fetch the new uploaded image
        const response = await fetch('/lovable-uploads/2bbf8ed2-f3d6-4042-b62b-2fb10b56313f.png');
        const blob = await response.blob();
        
        // Load the image
        const img = await loadImage(blob);
        console.log('Image loaded successfully');
        
        // Remove background
        const processedBlob = await removeBackground(img);
        console.log('Background removed successfully');
        
        // Create URL for the processed image
        const url = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(url);
        
      } catch (err) {
        console.error('Error processing image:', err);
        setError('Failed to process image');
        // Fallback to original image
        setProcessedImageUrl('/lovable-uploads/2bbf8ed2-f3d6-4042-b62b-2fb10b56313f.png');
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();

    // Cleanup function
    return () => {
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, []);

  if (isProcessing) {
    return (
      <div className="flex justify-center items-center h-96 animate-on-scroll">
        <div className="relative w-full max-w-md">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-idOrange border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-300">Processando imagem...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !processedImageUrl) {
    return (
      <div className="flex justify-center items-center h-96 animate-on-scroll">
        <div className="text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center animate-on-scroll">
      <div className="relative w-full max-w-lg">
        <img 
          src={processedImageUrl || '/lovable-uploads/2bbf8ed2-f3d6-4042-b62b-2fb10b56313f.png'}
          alt="Profissional da Agência iD"
          className="w-full h-auto object-contain animate-float rounded-2xl shadow-2xl"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(242, 113, 18, 0.4)) contrast(1.1) brightness(1.05)',
            maxHeight: '600px',
            imageRendering: 'crisp-edges'
          }}
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Enhanced glow effect */}
        <div className="absolute -inset-6 bg-gradient-to-br from-idOrange/20 via-idOrange/10 to-transparent rounded-full blur-2xl -z-10"></div>
        <div className="absolute -bottom-6 left-0 right-0 h-24 bg-gradient-to-t from-idBlack via-idBlack/80 to-transparent"></div>
        
        {/* Professional frame effect */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default HeroImage;
