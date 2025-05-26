
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
      <div className="relative w-full max-w-md">
        <img 
          src={processedImageUrl || '/lovable-uploads/2bbf8ed2-f3d6-4042-b62b-2fb10b56313f.png'}
          alt="Profissional da Agência iD"
          className="w-full h-auto object-contain animate-float rounded-lg"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(242, 113, 18, 0.3))',
            maxHeight: '500px'
          }}
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Subtle glow effect */}
        <div className="absolute -inset-4 bg-idOrange/10 rounded-full blur-xl -z-10"></div>
        <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-t from-idBlack to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroImage;
