import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSeleted: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSeleted, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus,setHasfocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];

      const searchWords = locationSearchInput.split(" ");

      //Converts each city object into a formatted string.
      //Filters the formatted strings based on the search criteria.
      //Returns the first five matches.

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry} , ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
    <div className="relative">
        <Input 
        placeholder="Search for a city"
        type="search"
        value = {locationSearchInput}
        onChange={(e) => setLocationSearchInput(e.target.value)} 
        onFocus={() => setHasfocus(true)}
        onBlur={() => setHasfocus(false)}
        {...props} 
        ref={ref} 
        />
        {locationSearchInput.trim() && (
            <div className="absolute z-20 divide-y bg-background shadow-xl border-x border-b rounded-b-lg">
                {!cities.length && <p className="p-3">No results found</p>}
                {cities.map(city => (
                    <button 
                    key={city} 
                    className="block w-full text-start p-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onLocationSeleted(city);
                      setLocationSearchInput("");
                    }}
                    >
                      {city}
                    </button>
                ))}
            </div>
        )}
    </div>
    );
  },
);
