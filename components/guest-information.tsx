"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function GuestInformation({ bookingData, updateBookingData, onNext, onBack }) {
  const [firstName, setFirstName] = useState(bookingData.guestInfo?.firstName || "")
  const [lastName, setLastName] = useState(bookingData.guestInfo?.lastName || "")
  const [email, setEmail] = useState(bookingData.guestInfo?.email || "")
  const [phone, setPhone] = useState(bookingData.guestInfo?.phone || "")
  const [country, setCountry] = useState(bookingData.guestInfo?.country || "")
  const [specialRequests, setSpecialRequests] = useState(bookingData.guestInfo?.specialRequests || "")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!firstName.trim()) newErrors.firstName = "Нэр оруулна уу"
    if (!lastName.trim()) newErrors.lastName = "Овог оруулна уу"
    if (!email.trim()) newErrors.email = "И-мэйл оруулна уу"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "И-мэйл хаяг буруу байна"
    if (!phone.trim()) newErrors.phone = "Утасны дугаар оруулна уу"
    if (!country) newErrors.country = "Улс сонгоно уу"
    if (!acceptTerms) newErrors.terms = "Үйлчилгээний нөхцөлийг зөвшөөрнө үү"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      updateBookingData({
        guestInfo: {
          firstName,
          lastName,
          email,
          phone,
          country,
          specialRequests,
        },
      })
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Зочны мэдээлэл</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            Нэр <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Овог <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            И-мэйл <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Утасны дугаар <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">
            Улс <span className="text-red-500">*</span>
          </Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country" className={errors.country ? "border-red-500" : ""}>
              <SelectValue placeholder="Улс сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mn">Монгол</SelectItem>
              <SelectItem value="cn">Хятад</SelectItem>
              <SelectItem value="ru">Орос</SelectItem>
              <SelectItem value="jp">Япон</SelectItem>
              <SelectItem value="kr">Өмнөд Солонгос</SelectItem>
              <SelectItem value="us">Америк</SelectItem>
              <SelectItem value="uk">Их Британи</SelectItem>
              <SelectItem value="de">Герман</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests">Тусгай хүсэлт</Label>
        <Input id="specialRequests" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} />
        <p className="text-sm text-[#9a9a9a]">Тусгай хүсэлт байвал бидэнд мэдэгдэнэ үү</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={setAcceptTerms}
            className={errors.terms ? "border-red-500" : ""}
          />
          <Label htmlFor="terms" className="text-sm">
            <a href="#" className="text-[#dfaa5b] hover:underline">
              Үйлчилгээний нөхцөл
            </a>{" "}
            болон{" "}
            <a href="#" className="text-[#dfaa5b] hover:underline">
              нууцлалын бодлого
            </a>
            -г зөвшөөрч байна
          </Label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
      </div>

      <div className="flex justify-between mt-6">
        <Button onClick={onBack} variant="outline">
          Буцах
        </Button>
        <Button onClick={handleContinue} className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white">
          Төлбөр рүү үргэлжлүүлэх
        </Button>
      </div>
    </div>
  )
}

