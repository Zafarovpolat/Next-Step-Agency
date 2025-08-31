
import Header from '@/components/header';
import Footer from '@/components/footer';
import MainContent from '@/components/main-content';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
