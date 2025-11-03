import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

const emailAuthSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100).optional(),
});

const phoneAuthSchema = z.object({
  phone: z.string().trim().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (use E.164 format, e.g., +1234567890)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100).optional(),
});

const Auth = () => {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email.trim()) {
        toast({
          title: "Email Required",
          description: "Please enter your email address to reset your password.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const emailValidation = z.string().email("Invalid email address");
      const result = emailValidation.safeParse(email);
      
      if (!result.success) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      toast({
        title: "Reset Email Sent",
        description: "Check your email for the password reset link.",
      });
      setIsForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate based on auth method
      const validation = authMethod === 'email' 
        ? emailAuthSchema.safeParse({ 
            email, 
            password,
            fullName: isSignUp ? fullName : undefined
          })
        : phoneAuthSchema.safeParse({ 
            phone, 
            password,
            fullName: isSignUp ? fullName : undefined
          });
      
      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (isSignUp) {
        const redirectUrl = `${window.location.origin}/dashboard`;
        
        if (authMethod === 'email') {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: redirectUrl,
              data: {
                full_name: fullName
              }
            }
          });

          if (error) {
            if (error.message.includes('already registered')) {
              toast({
                title: "Account exists",
                description: "This email is already registered. Please sign in instead.",
                variant: "destructive",
              });
              setIsSignUp(false);
            } else {
              throw error;
            }
            setLoading(false);
            return;
          }
        } else {
          // Phone signup
          const { error } = await supabase.auth.signUp({
            phone,
            password,
            options: {
              data: {
                full_name: fullName
              }
            }
          });

          if (error) {
            if (error.message.includes('already registered')) {
              toast({
                title: "Account exists",
                description: "This phone number is already registered. Please sign in instead.",
                variant: "destructive",
              });
              setIsSignUp(false);
            } else if (error.message.includes('SMS provider')) {
              toast({
                title: "Phone Authentication Not Configured",
                description: "Phone authentication requires SMS provider setup. Please use email authentication or contact support.",
                variant: "destructive",
              });
            } else {
              throw error;
            }
            setLoading(false);
            return;
          }
        }

        toast({
          title: "Account created!",
          description: authMethod === 'email' 
            ? "You can now sign in with your credentials." 
            : "Verification code sent. You can now sign in with your credentials.",
        });
        setIsSignUp(false);
      } else {
        // Sign in
        if (authMethod === 'email') {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            if (error.message.includes('Invalid login credentials')) {
              toast({
                title: "Invalid credentials",
                description: "The email or password you entered is incorrect.",
                variant: "destructive",
              });
            } else {
              throw error;
            }
            setLoading(false);
            return;
          }
        } else {
          // Phone sign in
          const { error } = await supabase.auth.signInWithPassword({
            phone,
            password,
          });

          if (error) {
            if (error.message.includes('Invalid login credentials')) {
              toast({
                title: "Invalid credentials",
                description: "The phone number or password you entered is incorrect.",
                variant: "destructive",
              });
            } else if (error.message.includes('SMS provider')) {
              toast({
                title: "Phone Authentication Not Configured",
                description: "Phone authentication requires SMS provider setup. Please use email authentication or contact support.",
                variant: "destructive",
              });
            } else {
              throw error;
            }
            setLoading(false);
            return;
          }
        }

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md glass glass-hover p-8 rounded-lg animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">DevLuxe</h1>
          <p className="text-muted-foreground">
            {isForgotPassword ? "Reset your password" : isSignUp ? "Create your account" : "Sign in to continue"}
          </p>
        </div>

        <form onSubmit={isForgotPassword ? handleForgotPassword : handleAuth} className="space-y-4">
          {/* Auth Method Toggle */}
          {!isForgotPassword && (
            <div className="flex gap-2 p-1 glass rounded-lg">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  authMethod === 'email' 
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  authMethod === 'phone' 
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Phone
              </button>
            </div>
          )}

          {isSignUp && !isForgotPassword && (
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className="mt-1 glass"
              />
            </div>
          )}
          
          {(authMethod === 'email' || isForgotPassword) ? (
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1 glass"
              />
            </div>
          ) : !isForgotPassword ? (
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                required
                className="mt-1 glass"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use E.164 format (e.g., +1234567890)
              </p>
            </div>
          ) : null}

          {!isForgotPassword && (
            <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="glass pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
          >
            {loading ? "Loading..." : isForgotPassword ? "Send Reset Link" : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {!isForgotPassword && (
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-accent hover:underline"
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          )}
          {!isSignUp && !isForgotPassword && (
            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="block w-full text-sm text-muted-foreground hover:text-accent cursor-pointer"
            >
              Forgot Password?
            </button>
          )}
          {isForgotPassword && (
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="text-sm text-accent hover:underline"
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
