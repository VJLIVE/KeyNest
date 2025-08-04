import { AuthForm } from '@/components/auth/AuthForm';
import { SiteHeader } from '@/components/site-header';

export default function SignupPage() {
  return (
    <>
      <SiteHeader showGetStarted={true}/>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-black px-4 py-12">
        <AuthForm type="signup" />
      </main>
    </>
  );
}
