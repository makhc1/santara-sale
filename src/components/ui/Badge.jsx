export default function Badge({ type, children }) {
  const styles = {
    new: "bg-primary text-white",
    limited: "bg-accent text-white",
    bestseller: "bg-[#F59E0B] text-white",
    outofstock: "bg-secondary text-white",
  }
  return (
    <span className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${styles[type] || "bg-gray-400 text-white"}`}>
      {children}
    </span>
  )
}