import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-[#dfdad3] flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Захиалга баталгаажлаа!</h1>
          <p className="text-[#5f5f5f] mb-6">
            Таны захиалгыг хүлээн авлаа. Бид таны и-мэйл хаяг руу баталгаажуулалт илгээсэн.
          </p>
          <div className="bg-[#f8f8f8] w-full p-4 rounded-md mb-6">
            <p className="text-sm text-[#5f5f5f] mb-2">Захиалгын дугаар:</p>
            <p className="font-medium text-lg">MRT-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button asChild className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white">
              <Link href="/booking/manage">Захиалга удирдах</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Нүүр хуудас руу буцах</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

