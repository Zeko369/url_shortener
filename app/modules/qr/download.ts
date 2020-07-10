const download = (slug: string) => {
  const canvas: HTMLCanvasElement | null = document.querySelector("#qr > canvas")

  if (canvas) {
    const pngUrl = canvas.toDataURL("image/octet-stream")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `qr-${slug}.png`

    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

export { download }
