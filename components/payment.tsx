"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet, Shield } from "lucide-react"

export default function Payment({ bookingData, updateBookingData, onNext, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState(bookingData.paymentMethod || "card")
  const [cardNumber, setCardNumber] = useState(bookingData.cardDetails?.number || "")
  const [cardName, setCardName] = useState(bookingData.cardDetails?.name || "")
  const [cardExpiry, setCardExpiry] = useState(bookingData.cardDetails?.expiry || "")
  const [cardCvc, setCardCvc] = useState(bookingData.cardDetails?.cvc || "")

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (paymentMethod === "card") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Картын дугаар оруулна уу"
      else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, "")))
        newErrors.cardNumber = "Картын дугаар 16 оронтой байх ёстой"

      if (!cardName.trim()) newErrors.cardName = "Картын эзэмшигчийн нэр оруулна уу"

      if (!cardExpiry.trim()) newErrors.cardExpiry = "Дуусах хугацаа оруулна уу"
      else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) newErrors.cardExpiry = "Дуусах хугацаа СС/ЖЖ форматтай байх ёстой"

      if (!cardCvc.trim()) newErrors.cardCvc = "CVC код оруулна уу"
      else if (!/^\d{3,4}$/.test(cardCvc)) newErrors.cardCvc = "CVC код 3 эсвэл 4 оронтой байх ёстой"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      updateBookingData({
        paymentMethod,
        cardDetails:
          paymentMethod === "card"
            ? {
                number: cardNumber,
                name: cardName,
                expiry: cardExpiry,
                cvc: cardCvc,
              }
            : null,
        totalPrice: bookingData.selectedRoom.price * bookingData.rooms,
      })
      onNext()
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e) => {
    const value = formatCardNumber(e.target.value)
    setCardNumber(value)
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value
    value = value.replace(/\D/g, "")

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4)
    }

    setCardExpiry(value)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Төлбөр</h2>

      <div className="bg-[#f8f8f8] p-4 rounded-md mb-6">
        <h3 className="font-medium mb-2">Захиалгын мэдээлэл</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Өрөө:</span>
            <span>{bookingData.selectedRoom.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Ирэх өдөр:</span>
            <span>{bookingData.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span>Гарах өдөр:</span>
            <span>{bookingData.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span>Зочид:</span>
            <span>{bookingData.guests}</span>
          </div>
          <div className="flex justify-between">
            <span>Өрөө:</span>
            <span>{bookingData.rooms}</span>
          </div>
          <div className="flex justify-between">
            <span>Өрөөний үнэ:</span>
            <span>₮{(bookingData.selectedRoom.price * bookingData.rooms).toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-bold">
            <span>Нийт үнэ:</span>
            <span>₮{(bookingData.selectedRoom.price * bookingData.rooms).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Төлбөрийн хэлбэр сонгох</h3>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
          <div
            className={`flex items-center space-x-3 border rounded-md p-4 cursor-pointer ${paymentMethod === "card" ? "border-[#dfaa5b]" : ""}`}
          >
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center cursor-pointer">
              <CreditCard className="w-5 h-5 mr-2" />
              Кредит/Дебит карт
            </Label>
          </div>

          <div
            className={`flex items-center space-x-3 border rounded-md p-4 cursor-pointer ${paymentMethod === "qpay" ? "border-[#dfaa5b]" : ""}`}
          >
            <RadioGroupItem value="qpay" id="qpay" />
            <Label htmlFor="qpay" className="flex items-center cursor-pointer">
              <Wallet className="w-5 h-5 mr-2" />
              QPay
            </Label>
          </div>

          <div
            className={`flex items-center space-x-3 border rounded-md p-4 cursor-pointer ${paymentMethod === "pay_at_hotel" ? "border-[#dfaa5b]" : ""}`}
          >
            <RadioGroupItem value="pay_at_hotel" id="pay_at_hotel" />
            <Label htmlFor="pay_at_hotel" className="flex items-center cursor-pointer">
              <Shield className="w-5 h-5 mr-2" />
              Зочид буудал дээр төлөх
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-4 mt-6 p-4 border rounded-md">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">
              Картын дугаар <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={errors.cardNumber ? "border-red-500" : ""}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">
              Картын эзэмшигчийн нэр <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="БАТБАЯР БОЛД"
              className={errors.cardName ? "border-red-500" : ""}
            />
            {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">
                Дуусах хугацаа <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cardExpiry"
                value={cardExpiry}
                onChange={handleExpiryChange}
                placeholder="СС/ЖЖ"
                maxLength={5}
                className={errors.cardExpiry ? "border-red-500" : ""}
              />
              {errors.cardExpiry && <p className="text-red-500 text-sm">{errors.cardExpiry}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardCvc">
                CVC <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cardCvc"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                placeholder="123"
                maxLength={4}
                className={errors.cardCvc ? "border-red-500" : ""}
              />
              {errors.cardCvc && <p className="text-red-500 text-sm">{errors.cardCvc}</p>}
            </div>
          </div>

          <div className="flex items-center text-sm text-[#5f5f5f] mt-2">
            <Shield className="w-4 h-4 mr-2 text-[#dfaa5b]" />
            Таны төлбөрийн мэдээлэл найдвартай, нууцлагдсан байдлаар хадгалагдана
          </div>
        </div>
      )}

      {paymentMethod === "qpay" && (
        <div className="p-4 border rounded-md mt-6 text-center">
          <p className="text-[#5f5f5f] mb-4">Та QPay төлбөрийн системд шилжүүлэгдэх болно.</p>
          <Button className="bg-[#0070ba] hover:bg-[#005ea6] text-white">QPay-ээр төлөх</Button>
        </div>
      )}

      {paymentMethod === "pay_at_hotel" && (
        <div className="p-4 border rounded-md mt-6">
          <p className="text-[#5f5f5f]">
            Та бүртгэл хийх үед зочид буудал дээр төлбөрөө төлөх болно. Зочид буудал таны картыг захиалгын дүнгээр
            урьдчилан баталгаажуулж болохыг анхаарна уу.
          </p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button onClick={onBack} variant="outline">
          Буцах
        </Button>
        <Button onClick={handleContinue} className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white">
          Захиалга шалгах
        </Button>
      </div>
    </div>
  )
}

