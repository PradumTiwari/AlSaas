import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";

const Page = () => {
  return (
    <div className="relative min-h-screen">
      {/* Apply the background gradient to the whole page */}
      <BgGradient />

      {/* Foreground content */}
      <div className="relative z-10">
        <UploadHeader />
        <UploadForm />
      </div>
    </div>
  );
};

export default Page;
