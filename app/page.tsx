import Image from "next/image"
import Link from "next/link"
import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#dfdad3]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-[#dfaa5b]">Marriot</span>
          <span className="text-[#dfaa5b]">🏨</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[#5f5f5f] hover:text-[#000000]">
            Өрөө
          </a>
          <a href="#" className="text-[#5f5f5f] hover:text-[#000000]">
            Хоол
          </a>
          <a href="#" className="text-[#5f5f5f] hover:text-[#000000]">
            Үйлчилгээ
          </a>
          <a href="#" className="text-[#5f5f5f] hover:text-[#000000]">
            Урамшуулал
          </a>
          <a href="#" className="text-[#5f5f5f] hover:text-[#000000]">
            Манай хот
          </a>
          <a href="#" className="text-[#5f5f5f] hover:text-[#000000]">
            Арга хэмжээ
          </a>
        </div>
        <Button className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white" asChild>
          <Link href="/booking">Захиалах</Link>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[500px]">
        <Image
          src="/images/hotel.jpg"
          alt="Зочид буудлын усан сан"
          width={1200}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-2">The Hotel-д тавтай морил</h1>
          <p className="text-xl">Таны тухын таны мэдрэмж</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="relative -mt-16 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-4 flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm font-medium mb-1">Ирэх өдөр</p>
            <div className="flex items-center border rounded-md p-2">
              <Calendar className="w-5 h-5 text-[#9a9a9a] mr-2" />
              <Input
              id="check-in"
              type="date"
              className="border-0 p-0 focus-visible:ring-0"
            />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm font-medium mb-1">Гарах өдөр</p>
            <div className="flex items-center border rounded-md p-2">
              <Calendar className="w-5 h-5 text-[#9a9a9a] mr-2" />
              <Input
              id="check-out"
              type="date"
              className="border-0 p-0 focus-visible:ring-0"
            />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm font-medium mb-1">Өрөө</p>
            <div className="flex items-center border rounded-md p-2">
              <Users className="w-5 h-5 text-[#9a9a9a] mr-2" />
              <Input type="text" placeholder="өрөөний тоо" className="border-0 p-0 focus-visible:ring-0 text-sm" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm font-medium mb-1">Зочид</p>
            <div className="flex items-center border rounded-md p-2">
              <Users className="w-5 h-5 text-[#9a9a9a] mr-2" />
              <Input type="text" placeholder="зочдын тоо" className="border-0 p-0 focus-visible:ring-0 text-sm" />
            </div>
          </div>
          <div className="flex items-end">
            <Button asChild className="bg-[#dfaa5b] hover:bg-[#7c6a46] text-white px-8">
              <Link href="/booking">Хайх</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Өрөө</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((room) => (
            <div key={room} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <Image
                  src={`/images/room${room}.jpg`}
                  alt="Зочид буудлын өрөө"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#dfaa5b] text-white px-2 py-1 rounded text-xs">2 хоног</div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Телевизор, Нэмэлт хөнжил ба Өглөөний хоол</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Үйлчилгээ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: "🏊‍♂️", name: "Усан бассейн" },
            { icon: "📶", name: "Wifi" },
            { icon: "🍽️", name: "Оргилсон цэг" },
            { icon: "🏋️‍♂️", name: "Gym" },
            { icon: "🎮", name: "Тоглоомын төв" },
            { icon: "💡", name: "24/7 Үйлчилгээ" },
            { icon: "🎵", name: "Утаалгын газар" },
            { icon: "☂️", name: "Зогсоол" },
          ].map((facility, index) => (
            <div key={index} className="bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl mb-4 text-[#dfaa5b]">{facility.icon}</div>
              <p className="text-sm text-[#5f5f5f]">{facility.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Сэтгэгдэл</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { date: "2023 оны 6-р сарын 25", rating: 5 },
            { date: "2023 оны 4-р сарын 5", rating: 5 },
            { date: "2023 оны 3-р сарын 2", rating: 5 },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <p className="text-sm text-[#5f5f5f]">{testimonial.date}</p>
                <div className="flex">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-[#ffce31]">
                        ★
                      </span>
                    ))}
                </div>
              </div>
              <p className="text-sm text-[#5f5f5f] mb-6">
                Миний хэлэх зүйл бүхэлдээ үнэхээрээ маш их байсан. Таны тухын нь цагийгаа үр дүнтэй өнгөрүүлэх боломжийг
                олгодог. Өрөө бүхэлдээ цэвэрхэн, үйлчилгээ маш сайхан байсан. Хоолны хувьд амттай, хүрэлцээтэй. Ажилчид
                маш найрсаг, тусламжийн бэлэн байсан.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d9d9d9]"></div>
                <p className="text-sm font-medium">Хэрэглэгч {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#dfaa5b] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-semibold">Marriot</span>
              <span>🏨</span>
            </div>
            <p className="text-sm">
              Монголын хамгийн тохилог үйлчилгээг үзүүлэх зорилготой. Таны амралт, аялал нь тав тухтай байх болно.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Шуурхай холбоос</h3>
            <div className="grid gap-2">
              <a href="#" className="text-sm hover:underline">
                Өрөө захиалах
              </a>
              <a href="#" className="text-sm hover:underline">
                Тээврийн үйлчилгээ
              </a>
              <a href="#" className="text-sm hover:underline">
                Холбоо барих
              </a>
              <a href="#" className="text-sm hover:underline">
                Хөтөлбөр
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Компани</h3>
            <div className="grid gap-2">
              <a href="#" className="text-sm hover:underline">
                Нууцлалын бодлого
              </a>
              <a href="#" className="text-sm hover:underline">
                Буцаалтын бодлого
              </a>
              <a href="#" className="text-sm hover:underline">
                Түгээмэл асуултууд
              </a>
              <a href="#" className="text-sm hover:underline">
                Бидний тухай
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Сошиал медиа</h3>
            <div className="grid gap-2">
              <a href="#" className="text-sm hover:underline">
                Facebook
              </a>
              <a href="#" className="text-sm hover:underline">
                Twitter
              </a>
              <a href="#" className="text-sm hover:underline">
                Instagram
              </a>
              <a href="#" className="text-sm hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12">
          <div className="border-t border-white/30 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-4">Мэдээллийн товхимол</h3>
                <p className="text-sm mb-4">
                  Манай мэдээллийн товхимолд бүртгүүлж, өрөөний хямдралт үнэ болон шинэ мэдээллийг авна уу.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="И-мэйл хаягаа оруулна уу"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                  />
                  <Button className="bg-white text-[#dfaa5b] hover:bg-white/90">Бүртгүүлэх</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

