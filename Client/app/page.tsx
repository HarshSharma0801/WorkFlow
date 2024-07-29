import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const font = Poppins({ subsets: ["latin"], weight: "600" });


export default function Home() {

  return (
    <>
      <main className="flex flex-col justify-center gap-3 items-center w-screen h-screen bg-custom-gradient">
        <div className="space-y-6 ">
          <h1 className={cn("text-6xl font-semibold text-sky-500 drop-shadow-md",
            font.className
          )
          }>
            WorkFlow
          </h1>
        
        </div>

        <div className="py-5">
          <Link href={'/home'}>
          <Button variant="outline" className="text-4xl text-sky-300 bg-[#6482AD] p-4">
            Lets Go
          </Button>
          </Link>
        </div>

        <div>
   
         
        </div>
      </main>
    </>
  );
}
