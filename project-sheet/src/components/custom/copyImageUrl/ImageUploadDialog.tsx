import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Check, Copy, Link as LinkIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/actions/server/ForClass';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface ImageUploadDialogProps {
  onUploadComplete?: (url: string) => void;
}

export default function ImageUploadDialog({ onUploadComplete }: ImageUploadDialogProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUploadStatus('idle');
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setUploadStatus('idle');
      }
    }
  };
  const {mutate,isPending} = useMutation({
    mutationKey: ['postNewContent'],
    mutationFn:(fromData:FormData)=>uploadImage(fromData),
    onSuccess: (data) => {
        console.log(data)
        setImageUrl(data?.url);
        setUploadStatus('success');
    }
  })
  const handleUpload = (): void => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', selectedFile);
    mutate(formData)
    // Simulate upload with timeout
   
    
   
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const resetUpload = (): void => {
    setSelectedFile(null);
    setPreview(null);
    setUploadStatus('idle');
    setImageUrl('');
  };

  return (
    <div className="flex items-center justify-center">
      <Button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Upload size={16} />
        Upload Image
      </Button>

      <Dialog open={open} onOpenChange={(newOpen: boolean) => {
        if (!newOpen) {
          resetUpload();
        }
        setOpen(newOpen);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Drop an image or select one from your device
            </DialogDescription>
          </DialogHeader>
          
          {uploadStatus === 'success' ? (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-center">
                <Check className="h-12 w-12 text-green-500" />
              </div>
              <p className="text-center font-medium">Image uploaded successfully!</p>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Image URL:</p>
                <div 
                  className="flex items-center gap-2 p-2 bg-gray-100 rounded border border-gray-300 cursor-pointer hover:bg-gray-200"
                  onClick={copyToClipboard}
                  title="Click to copy"
                >
                  <LinkIcon size={16} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm truncate w-full flex-1" ref={urlRef}>{imageUrl.slice(0,40)}..</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 flex-shrink-0"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      copyToClipboard();
                    }}
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </Button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
                )}
              </div>
              
              <div className="h-40 border rounded-lg overflow-hidden">
                <img 
                  src={preview || ''} 
                  alt="Uploaded" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div 
              className={`mt-4 h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="w-full h-full p-2 flex items-center justify-center">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag and drop an image, or click to select
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}
          
          <DialogFooter className="flex justify-between mt-4">
            {uploadStatus === 'success' ? (
              <>
                <Button variant="outline" onClick={resetUpload}>
                  Upload Another
                </Button>
                <Button onClick={() => setOpen(false)}>
                  Done
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetUpload();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpload} 
                  disabled={!selectedFile || isPending}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : 'Upload'}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}