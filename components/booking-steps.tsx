interface BookingStepsProps {
  currentStep: number
}

export default function BookingSteps({ currentStep }: BookingStepsProps) {
  const steps = [
    { number: 1, name: "Өрөө сонгох" },
    { number: 2, name: "Зочны мэдээлэл" },
    { number: 3, name: "Төлбөр" },
    { number: 4, name: "Баталгаажуулалт" },
  ]

  return (
    <div className="w-full">
      <div className="hidden md:flex justify-between items-center">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= step.number ? "bg-[#dfaa5b] text-white" : "bg-[#d9d9d9] text-[#5f5f5f]"
              }`}
            >
              {step.number}
            </div>
            <span className={`text-sm ${currentStep >= step.number ? "text-[#000000] font-medium" : "text-[#9a9a9a]"}`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Progress line */}
      <div className="hidden md:block h-1 bg-[#d9d9d9] mt-4 relative">
        <div
          className="absolute top-0 left-0 h-1 bg-[#dfaa5b]"
          style={{ width: `${(currentStep - 1) * 33.33}%` }}
        ></div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex items-center justify-center">
        <span className="text-[#5f5f5f]">Алхам {currentStep}/5: </span>
        <span className="font-medium ml-1">{steps[currentStep - 1].name}</span>
      </div>
    </div>
  )
}

