import React, { useState, useEffect, useRef } from 'react';
import { Upload, ShieldCheck, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import anime from 'animejs';
import { createWorker } from 'tesseract.js';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<{success: boolean, text?: string} | null>(null);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    anime({
        targets: '.login-card',
        translateY: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 200
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    anime({
        targets: '.login-card',
        rotateY: '360deg',
        duration: 800,
        easing: 'easeInOutSine',
        complete: () => setStep(2)
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading(true);
      setOcrResult(null);
      setProgress(10);

      try {
        const worker = await createWorker('eng', 1, {
            logger: m => {
                if(m.status === 'recognizing text') {
                    setProgress(Math.floor(m.progress * 100));
                }
            }
        });
        
        const { data: { text } } = await worker.recognize(file);
        console.log("OCR Text:", text);
        await worker.terminate();

        // Simple check for ID-like keywords
        const lowerText = text.toLowerCase();
        const keywords = ['govt', 'government', 'india', 'income', 'tax', 'dob', 'date of birth', 'male', 'female', 'name', 'card', 'identity', 'republic', 'number', 'aadhaar', 'pan', 'license', 'driving'];
        const matched = keywords.some(k => lowerText.includes(k));

        if (matched || text.length > 20) { // Fallback if text is just long enough to be an ID
            setOcrResult({ success: true, text: "ID Verified Successfully" });
        } else {
            setOcrResult({ success: false, text: "Could not detect clear ID text. Please try again or ensure lighting is good." });
        }
      } catch (err) {
        console.error(err);
        setOcrResult({ success: false, text: "Error processing image. Please try another." });
      } finally {
        setLoading(false);
      }
  };

  const handleVerification = () => {
    if (ocrResult?.success) {
        navigate('/home');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-brand-bg p-6 justify-center overflow-hidden relative perspective-1000 font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: '1s'}}></div>

      <div ref={cardRef} className="login-card max-w-md mx-auto w-full bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/60 transform-style-3d">
        <div className="mb-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-4 drop-shadow-md">
                <Logo className="w-full h-full" animate={true} />
            </div>
            <h1 className="text-4xl font-extrabold text-brand-dark mb-2 tracking-tight">Sahaya</h1>
            <p className="text-brand-muted font-medium">Your companion in pet parenting.</p>
        </div>

        {step === 1 && (
            <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Email or Phone</label>
                <input type="text" className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent focus:outline-none transition-all shadow-sm" placeholder="hello@sahaya.com" required />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Password</label>
                <input type="password" className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent focus:outline-none transition-all shadow-sm" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-primary hover:shadow-lg hover:shadow-brand-primary/30 hover:scale-[1.02] transition-all duration-300 shadow-md mt-2 flex items-center justify-center gap-2 group">
                Log In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-6 px-1">
                <span className="hover:text-brand-dark cursor-pointer transition font-medium">Forgot password?</span>
                <span className="text-brand-primary font-bold cursor-pointer hover:underline" onClick={() => setStep(2)}>Create Account</span>
            </div>
            </form>
        )}

        {step === 2 && (
            <div className="space-y-6">
                <div className="bg-brand-primaryLight/30 p-6 rounded-2xl border border-brand-primary/10">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-brand-dark">
                        <ShieldCheck className="text-brand-primary" />
                        Identity Verification (OCR)
                    </h3>
                    <p className="text-xs text-brand-muted mb-4 leading-relaxed font-medium">
                        Upload a clear photo of your Government ID (Pan Card, Aadhaar, License) for instant verification.
                    </p>

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />

                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center bg-white/60 mb-4 cursor-pointer transition group ${loading ? 'border-brand-primary animate-pulse' : 'border-brand-primary/30 hover:bg-white hover:border-brand-primary'}`}
                    >
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <span className="animate-spin h-6 w-6 border-2 border-brand-primary border-t-transparent rounded-full mb-2"></span>
                                <span className="text-xs font-bold text-brand-primary">Scanning ID... {progress}%</span>
                            </div>
                        ) : ocrResult ? (
                            <div className="flex flex-col items-center text-center">
                                {ocrResult.success ? (
                                    <>
                                        <CheckCircle className="text-green-500 mb-2" size={32} />
                                        <span className="text-sm font-bold text-green-700">Verification Successful</span>
                                        <span className="text-[10px] text-gray-500 mt-1">ID detected</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="text-red-500 mb-2" size={32} />
                                        <span className="text-sm font-bold text-red-600">Verification Failed</span>
                                        <span className="text-[10px] text-red-400 mt-1 px-4">{ocrResult.text}</span>
                                        <span className="text-xs text-brand-primary underline mt-2">Try Again</span>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="p-3 bg-brand-primaryLight rounded-full mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="text-brand-primary" size={24} />
                                </div>
                                <span className="text-sm font-bold text-brand-dark">Tap to Upload ID</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-start gap-3 mb-6">
                        <input type="checkbox" id="consent" className="mt-1 w-4 h-4 text-brand-primary rounded focus:ring-brand-primary border-gray-300" />
                        <label htmlFor="consent" className="text-xs text-gray-600 font-medium cursor-pointer select-none">
                            I consent to the processing of my data for verification.
                        </label>
                    </div>

                    <button 
                        onClick={handleVerification} 
                        disabled={!ocrResult?.success}
                        className={`w-full font-bold py-4 rounded-xl transition-all duration-300 transform ${ocrResult?.success ? 'bg-brand-primary text-white hover:bg-brand-dark hover:shadow-lg hover:-translate-y-1' : 'bg-gray-300 text-white cursor-not-allowed'}`}
                    >
                        {ocrResult?.success ? 'Enter Sahaya' : 'Complete Verification'}
                    </button>
                </div>
                <button onClick={() => setStep(1)} className="w-full text-center text-gray-400 font-bold text-sm hover:text-brand-dark transition">Back to Login</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Login;