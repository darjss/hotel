"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample room data
const availableRooms = [
  {
    id: 1,
    name: "Энгийн өрөө",
    description: "Телевизор, Нэмэлт хөнжил ба Өглөөний хоол",
    price: 408000,
    capacity: 2,
    amenities: ["TV", "WiFi", "Өглөөний хоол", "Агааржуулагч"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Дэлюкс өрөө",
    description: "Телевизор, Нэмэлт хөнжил ба Өглөөний хоол, хотын харагдах байдал",
    price: 612000,
    capacity: 2,
    amenities: ["TV", "WiFi", "Өглөөний хоол", "Агааржуулагч", "Хотын харагдах байдал"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Гүйцэтгэх өрөө",
    description: "Өргөн уужим өрөө, Телевизор, Нэмэлт хөнжил ба Өглөөний хоол",
    price: 850000,
    capacity: 4,
    amenities: ["TV", "WiFi", "Өглөөний хоол", "Агааржуулагч", "Зочны өрөө", "Мини бар"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Гэр бүлийн өрөө",
    description: "Олон ортой том өрөө, Телевизор, Нэмэлт хөнжил ба Өглөөний хоол",
    price: 748000,
    capacity: 5,
    amenities: ["TV", "WiFi", "Өглөөний хоол", "Агааржуулагч", "Олон ор"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function RoomSelection({ bookingData, updateBookingData, onNext }) {
  const [selectedRoomId, setSelectedRoomId] = useState(bookingData.selectedRoom?.id || null)
  const [checkIn, setCheckIn] = useState(bookingData.checkIn || "")
  const [checkOut, setCheckOut] = useState(bookingData.checkOut || "")
  const [guests, setGuests] = useState(bookingData.guests || 1)
  const [rooms, setRooms] = useState(bookingData.rooms || 1)
  const [filteredRooms, setFilteredRooms] = useState(availableRooms)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)

    // In a real app, you would fetch available rooms based on these criteria
    // For now, we'll just simulate a search with our static data
    setTimeout(() => {
      // Filter rooms based on capacity
      const filtered = availableRooms.filter((room) => room.capacity >= guests)
      setFilteredRooms(filtered)
      setIsSearching(false)
    }, 1000)
  }

  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId)
    const selectedRoom = availableRooms.find((room) => room.id === roomId)
    updateBookingData({
      selectedRoom,
      checkIn,
      checkOut,
      guests,
      rooms,
      totalPrice: selectedRoom.price * rooms,
    })
  }

  const handleContinue = () => {
    if (selectedRoomId) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Өрөө сонгох</h2>

      {/* Search criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="check-in">Ирэх өдөр</Label>
          <div className="flex items-center border rounded-md mt-1 p-2">
            <Calendar className="w-5 h-5 text-[#9a9a9a] mr-2" />
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border-0 p-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="check-out">Гарах өдөр</Label>
          <div className="flex items-center border rounded-md mt-1 p-2">
            <Calendar className="w-5 h-5 text-[#9a9a9a] mr-2" />
            <Input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border-0 p-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="guests">Зочид</Label>
          <div className="flex items-center border rounded-md mt-1 p-2">
            <Users className="w-5 h-5 text-[#9a9a9a] mr-2" />
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number.parseInt(e.target.value))}
              className="border-0 p-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="rooms">Өрөө</Label>
          <div className="flex items-center border rounded-md mt-1 p-2">
            <Users className="w-5 h-5 text-[#9a9a9a] mr-2" />
            <Input
              id="rooms"
              type="number"
              min="1"
              value={rooms}
              onChange={(e) => setRooms(Number.parseInt(e.target.value))}
              className="border-0 p-0 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white w-full"
        disabled={!checkIn || !checkOut || isSearching}
      >
        {isSearching ? "Хайж байна..." : "Боломжтой өрөөнүүдийг хайх"}
      </Button>

      {/* Available rooms */}
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-medium">Боломжтой өрөөнүүд</h3>

        {filteredRooms.map((room) => (
          <Card
            key={room.id}
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedRoomId === room.id ? "border-[#dfaa5b] ring-2 ring-[#dfaa5b]" : "hover:border-[#dfaa5b]"
            }`}
            onClick={() => handleRoomSelect(room.id)}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <Image
                  src={`/images/room${room.id}.jpg`}
                  alt={room.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{room.name}</h4>
                    <p className="text-[#5f5f5f] text-sm mt-1">{room.description}</p>
                  </div>
                  <Badge className="bg-[#dfaa5b]">₮{room.price.toLocaleString()}/шөнө</Badge>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-[#5f5f5f] mb-2">Үйлчилгээ:</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedRoomId === room.id && (
                  <div className="mt-4 flex items-center text-[#dfaa5b]">
                    <Check className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Сонгогдсон</span>
                  </div>
                )}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={handleContinue}
          className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white"
          disabled={!selectedRoomId}
        >
          Зочны мэдээлэл рүү үргэлжлүүлэх
        </Button>
      </div>
    </div>
  )
}

