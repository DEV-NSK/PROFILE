/**
 * Film grain overlay — CSS-only, no SVG filter, no canvas.
 * Uses a tiny base64 PNG noise texture tiled at low opacity.
 * This avoids creating a GPU compositing layer while still giving
 * the subtle grain texture the PRD calls for.
 */
const NoiseOverlay = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 pointer-events-none"
    style={{
      zIndex: 9998,
      // 64×64 grayscale noise PNG, base64 encoded — ~400 bytes
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpSIVBzuIOGSoThZERRy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoA4OTopuUiJ/0sKLWI8OO7Hu3uPu3cAUK8yzWqbADTdNlOJuJDJrgqhVwQQRh9GEJOZZcxJUhK+4+seAb7exXiW/7k/R4+asxgQEIljzjBt4g3imU3b4LxPHGFFWSU+Jx436YLEj1xXPH7jXHBZ4JkRM52aJ44Qi4UOVjqYFU2NeJo4qmo65QuZx1XOW5y1cpW1e/IXhnP6yjLXaQ4jgUUsQYIIBVWUUIYNm7UaKRIp2o/7+Adc/RK5FHKVwMixgAo0yK4f/A9+d2vlJye8pHAc6H5xnI9RILQLNGqO833sOM0TIPgMXOktf6UOzH6SXmtp0SMQXgYurlua8ge4XAEGngzZlF0pSFPIF4D3M/qmLDB4C/Sueb21znH6AGSoq+UbcHAIjBYoe93j3V2dvf17ptXfD8Rkcp+2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH6AUECiMnVKHiUAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABASURBVHja7cExAQAAAMKg9U9tCy+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAMBuAABHgAAAABJRU5ErkJggg==")`,
      backgroundRepeat: "repeat",
      backgroundSize: "64px 64px",
      opacity: 0.03,
    }}
  />
);

export default NoiseOverlay;
