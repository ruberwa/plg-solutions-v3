import { useState } from 'react'
import { officeLocations } from '../book/shared-contact-book'

// Positions are calibrated to the local world-map artwork.
const points: Record<string, [number, number]> = { rw: [58.3, 53], ng: [50.9, 46], ae: [65.3, 37] }

export default function LocationsMap() {
  const [selected, setSelected] = useState('rw')
  const office = officeLocations.find((item) => item.code === selected)!
  return (
    <div className="office-atlas" role="region" aria-label="PLG Solutions office locations">
      <div className="office-atlas-window">
        <div className="office-atlas-world">
          <img className="office-atlas-image" src="/assets/world-map-texture.png" alt="World map" />
          {officeLocations.map((item) => (
            <button key={item.code} type="button" className={`office-atlas-pin office-atlas-pin-${item.code}`} style={{ left: `${points[item.code][0]}%`, top: `${points[item.code][1]}%` }} aria-pressed={selected === item.code} aria-label={`${item.country}, ${item.city}`} onClick={() => setSelected(item.code)}>
              <svg className="office-atlas-connector" viewBox="0 0 16 16" aria-hidden="true">
                <line x1="8" y1="8" x2={item.code === 'ng' ? -14 : 30} y2={item.code === 'rw' ? 32 : -8} />
              </svg>
              <span className="office-atlas-dot" />
              <span className="office-atlas-label">
                <img src={`https://flagcdn.com/w40/${item.code}.png`} alt="" width="24" height="16" />
                <span><strong>{item.code === 'ae' ? 'UAE' : item.country}</strong><small>{item.city}{item.headquarters ? ' / HQ' : ''}</small></span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="office-atlas-locations">
        {officeLocations.map((item) => (
          <button key={item.code} type="button" aria-pressed={selected === item.code} onClick={() => setSelected(item.code)}>
            <img src={`https://flagcdn.com/w40/${item.code}.png`} alt="" width="24" height="16" />
            <span><strong>{item.country}</strong><small>{item.city}{item.headquarters ? ' / Headquarters' : ''}</small></span>
          </button>
        ))}
      </div>
      <p className="office-atlas-detail" aria-live="polite"><strong>{office.city}</strong> · {office.detail}</p>
    </div>
  )
}
