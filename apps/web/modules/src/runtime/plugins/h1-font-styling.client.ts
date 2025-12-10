export default defineNuxtPlugin(() => {
  // Globale H1 Font-Family setzen
  useHead({
    style: [
      `h1 { font-family: 'Cormorant Garamond' !important; }`
    ]
  })
})