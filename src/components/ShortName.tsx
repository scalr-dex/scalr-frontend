export default function ({ fullName }: { fullName: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full p-1 rounded-full bg-controls-tertiary-focus">
      {fullName[0]}
    </div>
  )
}
