'use client'

interface TrafficLightsProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

export function TrafficLights({ onClose, onMinimize, onMaximize }: TrafficLightsProps) {
  return (
    <div className="traffic-lights" aria-label="Window controls">
      <button
        type="button"
        className="traffic-light traffic-light--close"
        aria-label="Close window"
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
      />
      <button
        type="button"
        className="traffic-light traffic-light--minimize"
        aria-label="Minimize window"
        onClick={(event) => {
          event.stopPropagation()
          onMinimize()
        }}
      />
      <button
        type="button"
        className="traffic-light traffic-light--maximize"
        aria-label="Maximize window"
        onClick={(event) => {
          event.stopPropagation()
          onMaximize()
        }}
      />
    </div>
  )
}
