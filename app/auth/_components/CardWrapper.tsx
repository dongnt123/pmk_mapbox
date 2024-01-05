import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  headerDesc?: string;
  backButtonLabel: string;
  backButtonButtonLabel: string;
  backButtonLink: string;
}

const CardWrapper = ({ children, headerLabel, headerDesc, backButtonLabel, backButtonButtonLabel, backButtonLink }: CardWrapperProps) => {
  return (
    <div className="w-full md:w-[420px] flex flex-col gap-y-6">
      <Link href="/" className="flex justify-center items-center gap-4">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="object-cover" />
        <h2 className="text-3xl text-primary font-bold">PMK Mapbox</h2>
      </Link>
      <h2 className="text-center text-3xl">{headerLabel}</h2>
      {headerDesc && <p className="text-base text-center">{headerDesc}</p>}
      {children}
      <p className="text-base text-primary text-center">
        {backButtonLabel}
        <Button asChild variant="link" className="p-0 text-base">
          <Link href={backButtonLink} className="text-sky-500 ml-1">{backButtonButtonLabel}</Link>
        </Button>
      </p>
    </div>
  )
}

export default CardWrapper