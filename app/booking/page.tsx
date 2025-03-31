"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BookingSteps from "@/components/booking-steps"
import RoomSelection from "@/components/room-selection"
import GuestInformation from "@/components/guest-information"
import Payment from "@/components/payment"
import Confirmation from "@/components/booking-confirmation"

export default function BookingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
    selectedRoom: null,
    guestInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    extras: [],
    paymentMethod: "card",
    cardDetails: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
    totalPrice: 0,
  })

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleComplete = () => {
    // In a real app, you would submit the booking data to your backend here
    console.log("Booking completed:", bookingData)
    router.push("/booking/success")
  }

  return (
    <main className="min-h-screen bg-[#dfdad3]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-[#dfaa5b]">Marriot</span>
          <span className="text-[#dfaa5b]">🏨</span>
        </div>
        <Button variant="ghost" onClick={() => router.push("/")} className="text-[#5f5f5f] hover:text-[#000000]">
          Нүүр хуудас руу буцах
        </Button>
      </nav>

      {/* Booking Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Өрөө захиалах</h1>

        <BookingSteps currentStep={currentStep} />

        <Card className="mt-8">
          <CardContent className="p-6">
            {currentStep === 1 && (
              <RoomSelection bookingData={bookingData} updateBookingData={updateBookingData} onNext={handleNext} />
            )}

            {currentStep === 2 && (
              <GuestInformation
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <Payment
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <Confirmation bookingData={bookingData} onComplete={handleComplete} onBack={handleBack} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

