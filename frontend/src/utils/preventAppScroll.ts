const preventAppScroll = (bool: boolean) => {
  const htmlEl = document.querySelector('.App')
  if (bool) {
    htmlEl?.classList.add('noscroll')
    return
  }
  htmlEl?.classList.remove('noscroll')
}

export default preventAppScroll
