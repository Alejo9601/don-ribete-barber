export function useIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0')
        const entryChild = entry.target.firstElementChild

        if (entryChild?.classList.contains('lg:flex-row-reverse')) {
          entry.target.classList.add('animate-slide_right')
        } else entry.target.classList.add('animate-slide_left')

        observer.unobserve(entry.target)
      }
    })
  }, options)

  return observer
}
