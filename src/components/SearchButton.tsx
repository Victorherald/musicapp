interface SearchButtonProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchButton({ onSearch }: SearchButtonProps) {
  return (
    <button 
      onClick={() => onSearch("")}
      className="bg-white/10 hover:bg-white/20 text-white rounded-full px-5 py-2 "
    >
      Search
    </button>
  );
}
