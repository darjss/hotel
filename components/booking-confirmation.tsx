"use client"

import { Button } from "@/components/ui/button"
import { Check, Calendar, Users, CreditCard, Wallet, Shield } from "lucide-react"

export default function Confirmation({ bookingData, onComplete, onBack }) {
  const getPaymentMethodIcon = () => {
    switch (bookingData.paymentMethod) {
      case "card":
        return <CreditCard className="w-5 h-5" />
      case "qpay":
        return <Wallet className="w-5 h-5" />
      case "pay_at_hotel":
        return <Shield className="w-5 h-5" />
      default:
        return null
    }
  }

  const getPaymentMethodText = () => {
    switch (bookingData.paymentMethod) {
      case "card":
        return `Кредит карт (${bookingData.cardDetails.number.slice(-4)})`
      case "qpay":
        return "QPay"
      case "pay_at_hotel":
        return "Зочид буудал дээр төлөх"
      default:
        return "Тодорхойгүй"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Захиалгаа шалгах</h2>
        <p className="text-[#5f5f5f]">Баталгаажуулахаас өмнө захиалгын мэдээллээ шалгана уу</p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#f8f8f8] p-4 rounded-md">
          <h3 className="font-medium flex items-center mb-3">
            <Check className="w-5 h-5 text-[#dfaa5b] mr-2" />
            Өрөөний мэдээлэл
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#5f5f5f]">Өрөөний төрөл</p>
              <p className="font-medium">{bookingData.selectedRoom.name}</p>
            </div>
            <div>
              <p className="text-[#5f5f5f]">Нэг шөнийн үнэ</p>
              <p className="font-medium">₮{bookingData.selectedRoom.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[#5f5f5f]">Өрөөний тоо</p>
              <p className="font-medium">{bookingData.rooms}</p>
            </div>
            <div>
              <p className="text-[#5f5f5f]">Зочдын тоо</p>
              <p className="font-medium">{bookingData.guests}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f8f8] p-4 rounded-md">
          <h3 className="font-medium flex items-center mb-3">
            <Calendar className="w-5 h-5 text-[#dfaa5b] mr-2" />
            Байрлах хугацаа
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#5f5f5f]">Ирэх өдөр</p>
              <p className="font-medium">{bookingData.checkIn}</p>
            </div>
            <div>
              <p className="text-[#5f5f5f]">Гарах өдөр</p>
              <p className="font-medium">{bookingData.checkOut}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f8f8] p-4 rounded-md">
          <h3 className="font-medium flex items-center mb-3">
            <Users className="w-5 h-5 text-[#dfaa5b] mr-2" />
            Зочны мэдээлэл
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#5f5f5f]">Бүтэн нэр</p>
              <p className="font-medium">
                {bookingData.guestInfo.firstName} {bookingData.guestInfo.lastName}
              </p>
            </div>
            <div>
              <p className="text-[#5f5f5f]">И-мэйл</p>
              <p className="font-medium">{bookingData.guestInfo.email}</p>
            </div>
            <div>
              <p className="text-[#5f5f5f]">Утас</p>
              <p className="font-medium">{bookingData.guestInfo.phone}</p>
            </div>
            {bookingData.guestInfo.specialRequests && (
              <div className="col-span-2">
                <p className="text-[#5f5f5f]">Тусгай хүсэлт</p>
                <p className="font-medium">{bookingData.guestInfo.specialRequests}</p>
              </div>
            )}
          </div>
        </div>

        {bookingData.extras && bookingData.extras.length > 0 && (
          <div className="bg-[#f8f8f8] p-4 rounded-md">
            <h3 className="font-medium mb-3">Сонгосон нэмэлт үйлчилгээ</h3>
            <div className="space-y-2 text-sm">
              {bookingData.extras.map((extra) => (
                <div key={extra.id} className="flex justify-between">
                  <span>{extra.name}</span>
                  <span>₮{extra.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#f8f8f8] p-4 rounded-md">
          <h3 className="font-medium flex items-center mb-3">
            {getPaymentMethodIcon()}
            <span className="ml-2">Төлбөрийн хэлбэр</span>
          </h3>
          <p className="text-sm">{getPaymentMethodText()}</p>
        </div>

        <div className="bg-[#f8f8f8] p-4 rounded-md">
          <h3 className="font-medium mb-3">Үнийн дүн</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                Өрөөний үнэ ({bookingData.rooms} {bookingData.rooms > 1 ? "өрөө" : "өрөө"})
              </span>
              <span>₮{(bookingData.selectedRoom.price * bookingData.rooms).toLocaleString()}</span>
            </div>

            {bookingData.extras && bookingData.extras.length > 0 && (
              <div className="flex justify-between">
                <span>Нэмэлт үйлчилгээ</span>
                <span>₮{bookingData.extras.reduce((total, extra) => total + extra.price, 0).toLocaleString()}</span>
              </div>
            )}

            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Нийт үнэ</span>
              <span>₮{bookingData.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border border-[#dfaa5b] rounded-md bg-[#fff7f5]">
        <p className="text-sm">
          "Захиалга баталгаажуулах" товчийг дарснаар та манай үйлчилгээний нөхцөл, буцаалтын бодлого, нууцлалын бодлогыг
          зөвшөөрч байна. Баталгаажуулалтын и-мэйл {bookingData.guestInfo.email} хаяг руу илгээгдэх болно.
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <Button onClick={onBack} variant="outline">
          Буцах
        </Button>
        <Button onClick={onComplete} className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white">
          Захиалга баталгаажуулах
        </Button>
      </div>
    </div>
  )
}

